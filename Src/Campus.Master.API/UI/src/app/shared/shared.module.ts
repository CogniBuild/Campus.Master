import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstErrorPipe } from './pipes/first-error.pipe';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FirstErrorPipe],
  exports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, FirstErrorPipe],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule]
})
export class SharedModule {
}
