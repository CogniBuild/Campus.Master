import { Injectable, Pipe, PipeTransform } from "@angular/core";

@Injectable()
@Pipe({ name: "translate" })
export class TranslatePipeStub implements PipeTransform {
    public transform(key: string, ...args: any[]): any { return key }
}