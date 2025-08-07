import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Member } from '../../models/member.model';
import { CommonModule } from '@angular/common';
import { HdateComponent, HebrewDate } from "../hdate/hdate.component";
import { BmSelectComponent } from "../bm-select/bm-select.component";


@Component({
    selector: 'app-add-member',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, HdateComponent, BmSelectComponent],
    templateUrl: './add-member.component.html',
    styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent {

    hebrewDate = signal<HebrewDate | null>(null);

    memberForm: FormGroup;
    //todo - make bmParasha a separate component

    constructor(private fb: FormBuilder, private httpService: HttpService) {
        this.memberForm = this.fb.group({
            gender: ['MALE'],
            firstName: [''],
            lastName: [''],
            phone: [''],
            email: [''],
            hebrewName: [''],
            fatherName: [''],
            motherName: [''],
            bmParasha: [''],

            dob: this.fb.group({
                day: new FormControl(null),
                month: new FormControl(null),
                engDate: new FormControl(null)
            }),
            anniversary: this.fb.group({
                day: new FormControl(null),
                month: new FormControl(null),
                engDate: new FormControl(null)
            }),
            spouse: [''],
            aliya: this.fb.group({
                day: new FormControl(null),
                month: new FormControl(null),
                engDate: new FormControl(null)
            }),
            relative: this.fb.group({
                gender: ['MALE'],
                firstName: [''],
                lastName: [''],
                phone: [''],
                email: [''],
                hebrewName: [''],
                fatherName: [''],
                motherName: [''],
                dob: this.fb.group({
                    day: [''],
                    month: [''],
                    engDate: ['']
                }),
                bmParasha: [''],
                aliya: this.fb.group({
                    day: [''],
                    month: [''],
                    engDate: ['']
                }),
            }), //In form says second adult
            yartzeits: [[]] // Start with empty list
        });
    }

    onDobDateChange(hebrewDate: HebrewDate) {
        this.memberForm.patchValue({
            dob: {
                day: hebrewDate.day,
                month: hebrewDate.month,
                engDate: hebrewDate.engDate
            }
        });
    }

    onAnniversaryDateChange(hebrewDate: HebrewDate) {
        this.memberForm.patchValue({
            anniversary: {
                day: hebrewDate.day,
                month: hebrewDate.month,
                engDate: hebrewDate.engDate
            }
        });
    }

    onAliyaDateChange(hebrewDate: HebrewDate) {
        this.memberForm.patchValue({
            aliya: {
                day: hebrewDate.day,
                month: hebrewDate.month,
                engDate: hebrewDate.engDate
            }
        });
    }

    onParashaSelected(parasha: string) {
        this.memberForm.patchValue({ bmParasha: parasha });
    }

    onSubmit() {
        const member: Member = this.memberForm.value;
        this.httpService.saveMember(member).subscribe({
            next: (response) => {
                console.log('Member saved successfully', response);
            },
            error: (err) => {
                console.error('Error saving member', err);
            }
        });
    }

    get dobDayValue() {
        return this.memberForm.get('dob.day')?.value || 1;
    }

    get dobMonthValue() {
        return this.memberForm.get('dob.month')?.value || 'Tishrei';
    }

    get anniversaryDayValue() {
        return this.memberForm.get('anniversary.day')?.value || 1;
    }

    get anniversaryMonthValue() {
        return this.memberForm.get('anniversary.month')?.value || 'Tishrei';
    }

    get aliyaDayValue() {
        return this.memberForm.get('aliya.day')?.value || 1;
    }

    get aliyaMonthValue() {
        return this.memberForm.get('aliya.month')?.value || 'Tishrei';
    }
}