import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Member } from '../../models/member.model';
import { CommonModule } from '@angular/common';
import { HdateComponent, HebrewDate } from "../hdate/hdate.component";


@Component({
    selector: 'app-add-member',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, HdateComponent],
    templateUrl: './add-member.component.html'
})
export class AddMemberComponent {

hebrewDate = signal<HebrewDate | null>(null);

  onDobChange(newDate: HebrewDate) {
    console.log('New Hebrew Date:', newDate);
    this.hebrewDate.set(newDate);
  }

    memberForm: FormGroup;
//todo - make bmParasha a separate component
     parashot: string[] = [
        // בראשית
        "בראשית",
        "נח",
        "לך לך",
        "וירא",
        "חיי שרה",
        "תולדות",
        "ויצא",
        "וישלח",
        "וישב",
        "מקץ",
        "ויגש",
        "ויחי",

        // שמות
        "שמות",
        "וארא",
        "בא",
        "בשלח",
        "יתרו",
        "משפטים",
        "תרומה",
        "תצוה",
        "כי תשא",
        "ויקהל",
        "פקודי",
        "ויקהל - פקודי",

        // ויקרא
        "ויקרא",
        "צו",
        "שמיני",
        "תזריע",
        "מצורע",
        "תזריע - מצורע",
        "אחרי מות",
        "קדושים",
        "אחרי מות - קדושים",
        "אמור",
        "בהר",
        "בחוקותי",
        "בהר - בחוקותי",

        // במדבר
        "במדבר",
        "נשא",
        "בהעלותך",
        "שלח",
        "קורח",
        "חקת",
        "בלק",
        "פנחס",
        "מטות",
        "מסעי",
        "מטות - מסעי",

        // דברים
        "דברים",
        "ואתחנן",
        "עקב",
        "ראה",
        "שופטים",
        "כי תצא",
        "כי תבוא",
        "נצבים",
        "וילך",
        "נצבים - וילך",
        "האזינו",
        "וזאת הברכה"
    ];


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
                day: [''],
                month: [''],
                engDate: ['']
            }),
            anniversary: this.fb.group({
                day: [''],
                month: [''],
                engDate: [''],
            }),
            spouse: [''],
            aliya: this.fb.group({
                day: [''],
                month: [''],
                engDate: ['']
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

    onSubmit() {
        const member: Member = this.memberForm.value;
        console.log('Submitting member:', member);
        this.httpService.saveMember(member).subscribe({
            next: (response) => {
                console.log('Member saved successfully', response);
            },
            error: (err) => {
                console.error('Error saving member', err);
            }
        });
    }
}