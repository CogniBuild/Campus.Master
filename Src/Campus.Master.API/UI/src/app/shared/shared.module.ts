import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstErrorPipe } from './pipes/first-error.pipe';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from './factories/locale';
import { Locales } from './enum/locales.enum';

@NgModule({
  declarations: [FirstErrorPipe],
  exports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, FirstErrorPipe],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: Locales.EN
    })]
})
export class SharedModule {
}
