import { Component, EventEmitter, Output } from '@angular/core';
import { HdateComponent } from "../hdate/hdate.component";
import { Yartzeit } from '../../models/yartzeit.model';
import { Hdate } from '../../models/hdate.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-yartzeit',
    standalone: true,
    imports: [HdateComponent, FormsModule, CommonModule],
    templateUrl: './yartzeit.component.html',
    styleUrl: './yartzeit.component.css'
})
export class YartzeitComponent {
    @Output() pushYartzeit = new EventEmitter<Yartzeit>();
    error: boolean = false;

    name1: string = '';
    benbat: string = 'ben';
    name2: string = '';
    hDate: Hdate = new Hdate();
    relationship: string = '';
    otherRelationship: string = '';

    updateDate(date: Hdate) {
        this.hDate.month = date.month;
        this.hDate.day = date.day;
        this.hDate.engDate = date.engDate;
    }

    addYartzeit() {
        if (this.name1 && this.name2 && this.hDate.month && this.hDate.day &&
            (this.relationship == 'other' && this.otherRelationship || this.relationship && this.relationship !== 'other')) {
            this.error = false;


            const yartzeit: Yartzeit = {
                id: 0, // Assuming ID is auto-generated
                date: this.hDate,
                name: `${this.name1} ${this.benbat} ${this.name2}`,
                relationship: this.relationship === 'other' ? this.otherRelationship : this.relationship
            };

            this.pushYartzeit.emit(yartzeit);
        } else {
            this.error = true;
        }
    }
}
