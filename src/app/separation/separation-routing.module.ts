import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SeparationOverviewComponent} from './components/separation-overview/separation-overview.component';


const routes: Routes = [
    {path: 'overview', component: SeparationOverviewComponent},
    {path: 'separation/overview', component: SeparationOverviewComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SeparationRoutingModule { }
