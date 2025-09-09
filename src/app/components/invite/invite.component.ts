import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShulService } from '../../services/shul.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-invite',
    standalone: true,
    imports: [],
    templateUrl: './invite.component.html',
    styleUrl: './invite.component.css'
})
export class InviteComponent {
    private router = inject(Router);


    constructor(private httpService: HttpService,
        private route: ActivatedRoute,
        private shulService: ShulService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    ngOnInit() {
        const code = this.route.snapshot.paramMap.get('code') || '';
        if (isPlatformBrowser(this.platformId)) { //avoid routing on server side (because then routes twice)

            this.httpService.verifyCode(code).subscribe({
                next: (res) => {
                    this.shulService.verifiedEmail = res;
                    this.router.navigate(['member'], { queryParams: { edit: 'false' } });
                },
                error: (err) => {
                    this.router.navigate(['error'], { queryParams: { text: "the link is malformed or invalid" } });
                }
            });
        }
    }
}
