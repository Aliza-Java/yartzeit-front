import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-generate',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './generate.component.html',
    styleUrls: ['./generate.component.css']
})
export class GenerateComponent {
    generatedLink: string | null = null;
    copied: boolean = false;

    constructor(private httpService: HttpService, private router: Router) { }

    generate() {
        this.httpService.generateLink()
            .subscribe({
                next: (res) => {
                    // success
                    this.generatedLink = res;
                },
                error: (err) => {
                    // handle error: navigate to error page
                    this.router.navigate(['error'], { queryParams: { text: 'we were unable to generate a link' } });
                }
            });
        this.copied = false;
    }

    copyToClipboard() {
        if (this.generatedLink) {
            navigator.clipboard.writeText(this.generatedLink).then(() => {
                this.copied = true;
                setTimeout(() => (this.copied = false), 2000);
            });
        }
    }
}