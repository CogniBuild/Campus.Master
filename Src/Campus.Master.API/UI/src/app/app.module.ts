import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { UserPageLayoutComponent } from './views/user-page-layout/user-page-layout.component';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { EditProjectDialogComponent } from './dialog/edit-project-dialog/edit-project-dialog.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './auth/http.token.interceptor';
import { LeftSidebarComponent } from './views/left-sidebar/left-sidebar.component';
import { SignInService } from './core/sign-in.service';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LeftSidebarComponent,
    UserPageLayoutComponent,
    ConfirmDialogComponent,
    EditProjectDialogComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule
  ],
  providers: [
    SignInService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }
  ],
  entryComponents: [EditProjectDialogComponent, ConfirmDialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}
