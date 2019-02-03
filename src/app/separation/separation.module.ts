import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SeparationRoutingModule} from './separation-routing.module';
import {SeparationOverviewComponent} from './components/separation-overview/separation-overview.component';
import {EscapeHtmlPipe} from '../util/keep-html.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [SeparationOverviewComponent, EscapeHtmlPipe
  ],
  imports: [
    CommonModule,
    SeparationRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SeparationModule {
}
