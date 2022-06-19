import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Locales } from '../enum/locales.enum';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  constructor(private translate: TranslateService) { }

  getBrowserLocale(): string {
    return this.translate.getBrowserLang();
  }

  getAvailableLocales(): string[] {
    return Object.keys(Locales).map(key => Locales[key]);
  }

  useDetectedLocale(): void {
    const isLocaleAvailable = this.getAvailableLocales().includes(this.getBrowserLocale());
    this.translate.use(isLocaleAvailable ? this.getBrowserLocale() : Locales.EN);
  }

  useLocale(locale: Locales): void {
    this.translate.use(locale);
  }

  get(key: string | undefined, param?: object): Observable<string> {
    return this.translate.get(key, param);
  }
}
