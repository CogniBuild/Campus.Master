import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { SignInService } from './shared/services/sign-in.service';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { SidebarComponent } from './views/sidebar/sidebar.component';
import { StatComponent } from './views/tasks_board/stat/stat.component';
import { UserPageLayoutComponent } from './views/user-page-layout/user-page-layout.component';
import { TaskBoardLayoutComponent } from './views/tasks_board/task-board-layout/task-board-layout.component';
import { TaskComponent } from './views/tasks_board/task/task.component';
import { EditTaskDialogComponent } from './dialog/edit-task-dialog/edit-task-dialog.component';
import { TaskListLayoutComponent } from './views/task-list-layout/task-list-layout/task-list-layout.component';
import { ProjectsComponent } from './views/task-list-layout/projects/projects.component';
import { ProjectTasksComponent } from './views/tasks_board/task_board_left/project-tasks.component';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { EditProjectDialogComponent } from './dialog/edit-project-dialog/edit-project-dialog.component';
import { StatCardComponent } from './views/tasks_board/stat/stat-card/stat-card.component';
import { FooterComponent } from './views/footer/footer.component';
import { RegistrationService } from './shared/services/registration.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.inteceptor';
import { ProjectService } from './shared/services/project.service';
import { FirstErrorPipe } from './pipes/first-error.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SingInComponent,
    RegistrationPageComponent,
    SidebarComponent,
    StatComponent,
    UserPageLayoutComponent,
    TaskBoardLayoutComponent,
    TaskComponent,
    EditTaskDialogComponent,
    TaskListLayoutComponent,
    ProjectsComponent,
    ProjectTasksComponent,
    ConfirmDialogComponent,
    EditProjectDialogComponent,
    StatCardComponent,
    FooterComponent,
    FirstErrorPipe,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [SignInService, RegistrationService, ProjectService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  entryComponents: [EditTaskDialogComponent, ConfirmDialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
