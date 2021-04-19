import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomComponent } from './classroom.component';
import { ClassroomRoutingModule } from './classroom-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ClassroomItemComponent } from './shared/components/classroom-item/classroom-item.component';

@NgModule({
  declarations: [ClassroomComponent, ClassroomItemComponent],
  imports: [
    SharedModule,
    CommonModule,
    ClassroomRoutingModule
  ]
})
export class ClassroomModule {
}
