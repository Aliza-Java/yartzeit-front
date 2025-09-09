import { Injectable, signal } from "@angular/core";
import { Member } from "../models/member.model";

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

    verifiedEmail:string = "";

    selectedMember = signal<Member | null>(null);

  setSelectedMember(member: Member) {
    this.selectedMember.set(member);
  }

  clearSelectedMember() {
    this.selectedMember.set(null);
  }

}