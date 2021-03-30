import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstErrorPipe } from './pipes/first-error.pipe';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { DateFormat1Directive } from './date-formats/directives/date-format1/date-format1.directive';
import { DateFormat2Directive } from './date-formats/directives/date-format2/date-format2.directive';

@NgModule({
  declarations: [FirstErrorPipe],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FirstErrorPipe,
    MaterialModule,
    TranslateModule],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule
  ],
})
export class SharedModule {
}
