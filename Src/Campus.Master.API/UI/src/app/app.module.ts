import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { SignInService } from './auth/shared/services/sign-in.service';
import { StatComponent } from './views/tasks_board/stat/stat.component';
import { UserPageLayoutComponent } from './views/user-page-layout/user-page-layout.component';
import { TaskBoardLayoutComponent } from './views/tasks_board/task-board-layout/task-board-layout.component';
import { TaskComponent } from './views/tasks_board/task/task.component';
import { EditTaskDialogComponent } from './dialog/edit-task-dialog/edit-task-dialog.component';
import { TaskListLayoutComponent } from './views/task-list-layout/task-list-layout/task-list-layout.component';
import { ProjectsComponent } from './views/task-list-layout/projects/projects.component';
import { RightSidebarComponent } from './views/tasks_board/right-sidebar/right-sidebar.component';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { EditProjectDialogComponent } from './dialog/edit-project-dialog/edit-project-dialog.component';
import { StatCardComponent } from './views/tasks_board/stat/stat-card/stat-card.component';
import { RegistrationService } from './auth/shared/services/registration.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './auth/http.token.interceptor';
import { ProjectService } from './services/project.service';
import { LeftSidebarComponent } from './views/left-sidebar/left-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftSidebarComponent,
    StatComponent,
    UserPageLayoutComponent,
    TaskBoardLayoutComponent,
    TaskComponent,
    EditTaskDialogComponent,
    TaskListLayoutComponent,
    ProjectsComponent,
    RightSidebarComponent,
    ConfirmDialogComponent,
    EditProjectDialogComponent,
    StatCardComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    SignInService,
    RegistrationService,
    ProjectService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }
  ],
  entryComponents: [EditProjectDialogComponent, EditTaskDialogComponent, ConfirmDialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}
