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
        'Shevat',
        'Adar',
        'Adar 2',
        'Nisan',
        'Iyar',
        'Sivan',
        'Tammuz',
        'Av',
        'Elul'
    ];
}