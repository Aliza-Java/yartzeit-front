import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { ShulService } from '../../services/shul.service';

@Component({
    selector: 'app-generate',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './generate.component.html',
    styleUrls: ['./generate.component.css']
})
export class GenerateComponent {
    memberLink: string | "" = "";
    supporterLink: string | "" = "";
    memberCopied: boolean = false;
    supporterCopied: boolean = false;

    constructor(private httpService: HttpService, private shulService: ShulService) {
                this.shulService.isAdmin = true;
    }

    getMemberLink() {
        this.memberLink = this.httpService.memberLink;
        this.memberCopied = false;
    }
    
    getSupporterLink() {
        this.supporterLink = this.httpService.supporterLink;
        this.supporterCopied = false;
    }

    copyToClipboard(type: string) {
        if (type === 'member') {
            navigator.clipboard.writeText(this.memberLink).then(() => {
                this.memberCopied = true;
                setTimeout(() => (this.memberCopied = false), 2000);
            });
        } else {
            navigator.clipboard.writeText(this.supporterLink).then(() => {
                this.supporterCopied = true;
                setTimeout(() => (this.supporterCopied = false), 2000);
            });
        }
    }
}