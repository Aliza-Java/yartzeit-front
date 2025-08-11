import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { HDate } from 'hebcal';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ShulService } from '../../services/shul.service';
import { Hdate } from '../../models/hdate.model';

export interface HebrewDate {
    day: number;
    month: string;
    engDate: Date | string; // ISO format "YYYY-MM-DD"
}

@Component({
    selector: 'app-hdate',
    templateUrl: './hdate.component.html',
    styleUrls: ['./hdate.component.css'],
    standalone: true,
    imports: [NgbDatepickerModule]
})
export class HdateComponent {
    @Output() dateChange = new EventEmitter<Hdate>();

    @Input() hebrewDay: number | null = null;
    @Input() hebrewMonth: number | null = null;

    minDate: { year: number; month: number; day: number; };
    maxDate: { year: number; month: number; day: number; };

    checkDateAlert = false;

    days: number[] = Array.from({ length: 30 }, (_, i) => i + 1);

    constructor(public shulService: ShulService) {
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

    onDatePick(date: NgbDate) {
        this.calculateHebrew(new Date(date.year, date.month - 1, date.day));
    }

    onDateType(dateString: string) {
        const datePattern = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

        if (datePattern.test(dateString)) {
            const dateParts = dateString.split('-');

            const year = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10) - 1; // JS months are 0-based
            const day = parseInt(dateParts[2], 10);

            this.calculateHebrew(new Date(year, month, day));
        }
    }

    calculateHebrew(jsDate: Date) {
        const hDate = new HDate(jsDate);

        const tmp = new Date(jsDate);
        tmp.setHours(12, 0, 0, 0); // noon local time, to avoid time-difference issues
        const engDateString = tmp.toISOString().split('T')[0];

        const hebrewDate: Hdate = {
            day: hDate.getDate(),
            month: hDate.getMonthName(),
            engDate: engDateString 
        };

        this.checkDateAlert = true;
        this.dateChange.emit(hebrewDate);
    }
}    