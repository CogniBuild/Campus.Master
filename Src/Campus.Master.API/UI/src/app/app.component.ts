import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor(public translate: TranslateService) {

    // Automatically set browser locale
    const browserLocale = translate.getBrowserLang();
    translate.use(environment.usedLocales.includes(browserLocale)
                  ? browserLocale
                  : environment.defaultLocale);
  }

}
