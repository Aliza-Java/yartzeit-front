import { Component, EventEmitter, Output } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { HDate } from 'hebcal';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

export interface HebrewDate {
  day: number;
  month: number;
  engDate: Date;
}

@Component({
  selector: 'app-hdate',
  templateUrl: './hdate.component.html',
  standalone: true,
  imports: [NgbDatepickerModule]
})
export class HdateComponent {
  @Output() hebrewDateChange = new EventEmitter<HebrewDate>();
    minDate: { year: number; month: number; day: number; };
    maxDate: { year: number; month: number; day: number; };

constructor() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    this.minDate = {
      year: currentYear - 100,
      month: 1,
      day: 1
    };

    this.maxDate = {
      year: currentYear,
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate()
    };
  }

  onDateSelect(date: NgbDate) {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    const hDate = new HDate(jsDate);

    const myDate: HebrewDate = {
      day: hDate.getDate(),
      month: hDate.getMonth(),
      engDate: jsDate
    };

    this.hebrewDateChange.emit(myDate);
  }
}