import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderMenuInfoComponent } from './header-menu-info.component';
import { SharedModule } from '../../shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    HeaderMenuInfoComponent
  ],
  exports: [
    HeaderMenuInfoComponent
  ]
})
export class HeaderMenuInfoModule {
}
