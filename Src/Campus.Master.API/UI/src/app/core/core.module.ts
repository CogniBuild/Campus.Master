import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SignInService } from './services/sign-in.service';
import { TranslateLoader, TranslateModule, TranslateStore } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Locales } from '@core/enum/locales.enum';
import { LocaleService } from '@core/services';
import { HttpLoaderFactory } from '@core/factories/locale';

@NgModule({
  providers: [SignInService, LocaleService, TranslateStore],
  imports: [
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: Locales.UA
    })
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
