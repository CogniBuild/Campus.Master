import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstErrorPipe } from './pipes/first-error.pipe';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { TranslateModule } from '@ngx-translate/core';

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
