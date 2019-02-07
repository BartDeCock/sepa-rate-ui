import {Observable, of, throwError as observableThrowError} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Moment} from 'moment';
import * as moment from 'moment';


export interface Credentials {
  accessToken: string;
  refreshToken: string;
  email: string;
  name: string;
  userName?: string;
  companyName: string;
  roles: string[];
  userId: string;
  accessTokenValidUntil: Moment;
  refreshTokenValidUntil: Moment;
  country: string;
}

export interface LoginContext {
  username: string;
  password: string;
}

export interface TokenContext {
  access_token: string;
  expires_in: number;
  'not-before-policy': number;
  refresh_expires_in: number;
  refresh_token: string;
  session_state: string;
  token_type: string;
}

const credentialsKey = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _credentials: Credentials | null;

  constructor(private httpClient: HttpClient, private _router: Router) {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  public static tokenToCredentials(res: TokenContext) {
    const userData: any = jwt_decode(res.access_token);
    return {
      accessToken: res.access_token,
      refreshToken: res.refresh_token,
      email: userData.email,
      name: userData.name,
      userId: userData.sub,
      userName: userData.preferred_username,
      country: '/',
      roles: userData.realm_access ? userData.realm_access.roles : [],
      accessTokenValidUntil: moment().add(res.expires_in, 'seconds'),
      refreshTokenValidUntil: moment().add(res.refresh_expires_in, 'seconds')
    } as Credentials;
  }


  login(context: LoginContext): Observable<any> {
    return this.httpClient
      .post(`${environment.backendUrl}/login`, context)
      .pipe(
        map((res: TokenContext) => {
          const credentials = AuthenticationService.tokenToCredentials(res);
          this.setCredentials(credentials);
          this.fetchCountryForLoggedInUser(context);
          return credentials;
        }));
  }

  private fetchCountryForLoggedInUser(context: LoginContext) {
    this.httpClient.get(`${environment.backendUrl}/user/country/${context.username}`)
      .subscribe((country: any) => {
        this.credentials.country = country.country.substring(1, country.country.length - 1);
        this.setCredentials(this.credentials);
      });
  }

  logout() {
    this.setCredentials();
    this._router.navigateByUrl('/login');
  }

  ensureLoggedOut() {
    if (this.isAuthenticated()) {
      this.setCredentials();
    }
  }

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  get credentials(): Credentials | null {
    return this._credentials;
  }

  public setCredentials(credentials?: Credentials) {
    this._credentials = credentials || null;

    if (credentials) {
      sessionStorage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

  refreshToken() {
    if (this.credentials) {
      const refreshBody = {
        refreshToken: this.credentials.refreshToken
      };

      return this.httpClient
        .post(`${environment.backendUrl}/rest/ui/useraccount/refresh`, refreshBody)
        .pipe(
          map((res: TokenContext) => {
            const credentials = AuthenticationService.tokenToCredentials(res);
            this.setCredentials(credentials);
            return of(credentials);
          })).pipe(
          catchError(error => {
            return observableThrowError(error);
          }));
    } else {
      throw new Error(('refresh token expired'));
    }
  }

  getCurrentUserDetails() {
    return <Observable<any>> this.httpClient
      .post(`${environment.backendUrl}/rest/ui/useraccount`, {
        email: this.credentials.email
      });
  }
}

