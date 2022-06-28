import { EventEmitter, Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable()
export class TranslationServiceStub {
    public onLangChange = new EventEmitter<any>()
    public onTranslationChange = new EventEmitter<any>()
    public onDefaultLangChange = new EventEmitter<any>()
    public addLangs(langs: string[]) { return }
    public getLangs() { return ["en-us"] }
    public getBrowserLang() { return "" }
    public getBrowserCultureLang() { return "" }
    public use(lang: string) { return null }
    public get(key: any): any { return of(key) }
}