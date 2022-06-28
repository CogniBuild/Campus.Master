import { NgModule } from "@angular/core";
import { TranslatePipeStub } from "./translate.pipe.stub";
import { TranslationServiceStub } from "./translation.service.stub";
import { TranslateService } from "@ngx-translate/core";

@NgModule({
    declarations: [
        TranslatePipeStub,
    ],
    exports: [
        TranslatePipeStub,
    ],
    providers: [
        { provide: TranslateService, useClass: TranslationServiceStub },
    ],
})
export class TranslateStubsModule { }