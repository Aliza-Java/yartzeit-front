import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Member } from '../../models/member.model';
import { CommonModule } from '@angular/common';
import { HdateComponent } from "../hdate/hdate.component";
import { BmSelectComponent } from "../bm-select/bm-select.component";
import { Hdate } from '../../models/hdate.model';


@Component({
    selector: 'app-add-member',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, HdateComponent, BmSelectComponent],
    templateUrl: './add-member.component.html',
    styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent {

    thereIsSecondAdult = signal(false);

    memberForm: FormGroup;

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
                    day: new FormControl(null),
                month: new FormControl(null),
                engDate: new FormControl(null)
                }),
                bmParasha: [''],
                aliya: this.fb.group({
                   day: new FormControl(null),
                month: new FormControl(null),
                engDate: new FormControl(null)
                }),
            }), //In the form it says second adult
            yartzeits: [[]] // Start with empty list
        });
    }

    onDobDateChange(hebrewDate: Hdate) {
        this.memberForm.patchValue({
            dob: {
                day: hebrewDate.day,
                month: hebrewDate.month,
                engDate: hebrewDate.engDate
            }
        });
    }

    onDobDateRelativeChange(hebrewDate: Hdate) {
        this.memberForm.patchValue({
            relative: {
                dob: {
                    day: hebrewDate.day,
                    month: hebrewDate.month,
                    engDate: hebrewDate.engDate
                }
            }
        });
    }

    onAnniversaryDateChange(hebrewDate: Hdate) {
        this.memberForm.patchValue({
            anniversary: {
                day: hebrewDate.day,
                month: hebrewDate.month,
                engDate: hebrewDate.engDate
            }
        });
    }

    onAliyaDateChange(hebrewDate: Hdate) {
        this.memberForm.patchValue({
            aliya: {
                day: hebrewDate.day,
                month: hebrewDate.month,
                engDate: hebrewDate.engDate
            }
        });
    }

    onAliyaDateRelativeChange(hebrewDate: Hdate) {
        this.memberForm.patchValue({
            relative: {
                aliya: {
                    day: hebrewDate.day,
                    month: hebrewDate.month,
                    engDate: hebrewDate.engDate
                }
            }
        });
    }

    onParashaSelected(parasha: string) {
        this.memberForm.patchValue({ bmParasha: parasha });
    }

    onParashaRelativeSelected(parasha: string) {
        this.memberForm.patchValue({ relative: { bmParasha: parasha } });
    }

    onToggleRelative() {
        this.thereIsSecondAdult.set(!this.thereIsSecondAdult());
    }

    onSubmit() {
        const member: Member = this.memberForm.value;

        //clear form details so they match hiding conditions
       
        if (member.gender == 'FEMALE') {
            member.bmParasha = '';
        }
        if (member.relative && member.relative.gender == 'FEMALE') {
            member.relative.bmParasha = ''; 
        }
         if (!this.thereIsSecondAdult()) {
            member.relative = null;
        }

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
        return this.memberForm.get('dob.day')?.value || '';
    }

    get dobMonthValue() {
        return this.memberForm.get('dob.month')?.value || '';
    }

    get dobDayRelValue() {
        return this.memberForm.get('relative.dob.day')?.value || '';
    }

    get dobMonthRelValue() {
        return this.memberForm.get('relative.dob.month')?.value || '';
    }

    get anniversaryDayValue() {
        return this.memberForm.get('anniversary.day')?.value || '';
    }

    get anniversaryMonthValue() {
        return this.memberForm.get('anniversary.month')?.value || '';
    }

    get aliyaDayValue() {
        return this.memberForm.get('aliya.day')?.value || '';
    }

    get aliyaMonthValue() {
        return this.memberForm.get('aliya.month')?.value || '';
    }

     get aliyaDayRelValue() {
        return this.memberForm.get('relative.aliya.day')?.value || '';
    }

    get aliyaMonthRelValue() {
        return this.memberForm.get('relative.aliya.month')?.value || '';
    }
}