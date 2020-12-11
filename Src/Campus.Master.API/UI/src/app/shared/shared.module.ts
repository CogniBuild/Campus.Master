import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstErrorPipe } from './pipes/first-error.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FirstErrorPipe],
  exports: [CommonModule, FirstErrorPipe],
  imports: [CommonModule, RouterModule]
})
export class SharedModule {
}
