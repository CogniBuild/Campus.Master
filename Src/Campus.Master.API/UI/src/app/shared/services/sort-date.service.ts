import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortDateService {

  constructor() {
  }

  testData = 'week-1';

  setDate(date: string) {
    this.testData = date;
    return this.testData;
  }

  getDateSort() {
    return this.testData;
  }
}



