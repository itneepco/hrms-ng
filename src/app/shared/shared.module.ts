import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CalendarModule } from 'angular-calendar';

import { AppMaterialModule } from '../app-material/app-material.module';
import { SubheaderComponent } from './components/subheader/subheader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule,
    CalendarModule.forRoot()
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    SubheaderComponent,
    CalendarModule
  ],
  declarations: [
    SubheaderComponent,
  ]
})
export class SharedModule { }
