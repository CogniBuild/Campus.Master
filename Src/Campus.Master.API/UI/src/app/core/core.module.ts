import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SignInService } from './services/sign-in.service';
import { TranslateLoader, TranslateModule, TranslateStore } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Locales } from '@core/enum/locales.enum';
import { LocaleService } from '@core/services';
import { HttpLoaderFactory } from '@core/factories/locale';
import { HttpTokenInterceptor } from '@core/http.token.interceptor';
import { CanActivateDashboardGuard } from '@core/guards/can-activate-dashboard.guard';

@NgModule({
  providers:
    [
      CanActivateDashboardGuard,
      SignInService,
      LocaleService,
      TranslateStore,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpTokenInterceptor,
        multi: true
      }],
  imports: [
    TranslateModule.forRoot({
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
