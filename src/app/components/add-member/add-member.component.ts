import { ChangeDetectorRef, Component, inject, Input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Member } from '../../models/member.model';
import { CommonModule } from '@angular/common';
import { HdateComponent } from "../hdate/hdate.component";
import { BmSelectComponent } from "../bm-select/bm-select.component";
import { Hdate } from '../../models/hdate.model';
import { Yartzeit } from '../../models/yartzeit.model';
import { YartzeitComponent } from '../yartzeit/yartzeit.component';
import { finalize } from 'rxjs';
import { ShulService } from '../../services/shul.service';


@Component({
    selector: 'app-add-member',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, HdateComponent, BmSelectComponent, YartzeitComponent],
    templateUrl: './add-member.component.html',
    styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

    @Input() member?: Member;

    isEdit: boolean = false;
    thereIsSecondAdult = signal(false);
    isLoading = signal(false);

    memberForm: FormGroup = new FormGroup({});
    yartzeits: Yartzeit[] = [];
    addingYartzeit: boolean = true;

    private fb = inject(FormBuilder);
    private httpService = inject(HttpService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private shulService = inject(ShulService);

    constructor(private cdr: ChangeDetectorRef) {}  

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.isEdit = (params['edit'] === 'true');
            if (this.isEdit) {
                this.addingYartzeit = false; //start with showing yartzeits, can add more
            }
        });

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
                day: new FormControl(0),
                month: new FormControl(""),
                engDate: new FormControl(null)
            }),
            anniversary: this.fb.group({
                day: new FormControl(0),
                month: new FormControl(""),
                engDate: new FormControl(null)
            }),
            spouse: [''],
            aliya: this.fb.group({
                day: new FormControl(0),
                month: new FormControl(""),
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
                    day: new FormControl(0),
                    month: new FormControl(""),
                    engDate: new FormControl(null)
                }),
                bmParasha: [''],
                aliya: this.fb.group({
                    day: new FormControl(0),
                    month: new FormControl(""),
                    engDate: new FormControl(null)
                }),
            }), //In the form it says second adult
            yartzeits: [[]] // Start with empty list
        });

        const member = this.shulService.selectedMember();
        if (member) {
            this.memberForm.patchValue(member);
            this.yartzeits = member.yartzeits || [];
            if (member.relative) {
                this.thereIsSecondAdult.set(true);
            }
        }
        console.log(this.yartzeits);
          this.cdr.detectChanges();

    }

    addYartzeit() {
        this.addingYartzeit = true;
    }

    onYartzeitAdded(y: Yartzeit) {
        this.yartzeits.push(y);
        this.addingYartzeit = false;
    }

    removeYartzeit(y: Yartzeit) {
        this.yartzeits = this.yartzeits.filter(item => item !== y);
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
        this.isLoading.set(true);

        const member: Member = this.memberForm.value;
        member.yartzeits = this.yartzeits;

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

        this.httpService.saveMember(member, this.isEdit)
            .pipe(finalize(() => this.isLoading.set(false))) // Always runs after completion or error
            .subscribe({
                next: (response) => {
                    console.log(this.isEdit ? 'Member edited successfully' : 'Member added successfully', response);
                    this.router.navigate(['/success']);

                },
                error: (err) => {
                    console.error(this.isEdit ? 'Error editing member' : 'Error adding member', err);
                    this.router.navigate(['/error']);
                }
            });
    }

    get dobDayValue() {
        return this.memberForm.get('dob.day')?.value || '';
    }

    get dobMonthValue() {
        return this.memberForm.get('dob.month')?.value || '';
    }

    get dobEngDateValue() {
        return this.memberForm.get('dob.engDate')?.value || '';
    }

    get dobDayRelValue() {
        return this.memberForm.get('relative.dob.day')?.value || '';
    }

    get dobMonthRelValue() {
        return this.memberForm.get('relative.dob.month')?.value || '';
    }

    get dobEngDateRelValue() {
        return this.memberForm.get('relative.dob.engDate')?.value || '';
    }

    get anniversaryDayValue() {
        return this.memberForm.get('anniversary.day')?.value || '';
    }

    get anniversaryMonthValue() {
        return this.memberForm.get('anniversary.month')?.value || '';
    }

     get anniversaryEngDateValue() {
        return this.memberForm.get('anniversary.engDate')?.value || '';
    }

    get aliyaDayValue() {
        return this.memberForm.get('aliya.day')?.value || '';
    }

    get aliyaMonthValue() {
        return this.memberForm.get('aliya.month')?.value || '';
    }

    get aliyaEngDateValue() {
        return this.memberForm.get('aliya.engDate')?.value || '';
    }

    get aliyaDayRelValue() {
        return this.memberForm.get('relative.aliya.day')?.value || '';
    }

    get aliyaMonthRelValue() {
        return this.memberForm.get('relative.aliya.month')?.value || '';
    }

    get aliyaEngDateRelValue() {
        return this.memberForm.get('relative.aliya.engDate')?.value || '';
    }
}