import { Component, EventEmitter, forwardRef, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-bm-select',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BmSelectComponent),
      multi: true
    }
  ],
  imports: [],
  templateUrl: './bm-select.component.html',
  styleUrl: './bm-select.component.css'
})
export class BmSelectComponent implements ControlValueAccessor {
    writeValue(obj: any): void {
        throw new Error('Method not implemented.');
    }
    registerOnChange(fn: any): void {
        throw new Error('Method not implemented.');
    }
    registerOnTouched(fn: any): void {
        throw new Error('Method not implemented.');
    }
    setDisabledState?(isDisabled: boolean): void {
        throw new Error('Method not implemented.');
    }

@Output() parashaSelected = new EventEmitter<string>();

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

    onSelectParasha(event: Event) {
        const selectElement = event.target as HTMLSelectElement;
        const selectedParasha = selectElement.value;
        this.parashaSelected.emit(selectedParasha);
    }
}
