import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ShulService {
    hebrewMonths: string[] = [
        'Tishrei',
        'Cheshvan',
        'Kislev',
        'Tevet',
        "Sh'vat", //that's how it is spelled in hebcal
        'Adar',
        'Adar 2',
        'Nisan',
        'Iyyar',
        'Sivan',
        'Tamuz',
        'Av',
        'Elul'
    ];
}