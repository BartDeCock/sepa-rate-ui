import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SeparationRoutingModule} from './separation-routing.module';
import { SeparationOverviewComponent } from './components/separation-overview/separation-overview.component';

@NgModule({
  declarations: [SeparationOverviewComponent],
  imports: [
    CommonModule,
    SeparationRoutingModule
  ]
})
export class SeparationModule { }
