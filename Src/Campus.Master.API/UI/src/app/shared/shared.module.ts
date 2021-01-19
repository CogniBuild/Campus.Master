import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstErrorPipe } from './pipes/first-error.pipe';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from './factories/locale';
import { Locales } from './enum/locales.enum';
import { LocaleService } from './services/locale.service';

@NgModule({
  declarations: [FirstErrorPipe],
  exports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, FirstErrorPipe, TranslateModule],
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
    })],
  providers: [LocaleService, TranslateStore]
})
export class SharedModule {
}
