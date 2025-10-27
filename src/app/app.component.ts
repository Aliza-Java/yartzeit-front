import { Component, Inject } from "@angular/core";
import { NavigationEnd, NavigationStart, Router, RouterModule, RouterOutlet } from "@angular/router";
import { NgxSpinnerModule } from "ngx-spinner";
import { ShulService } from "./services/shul.service";
import { CommonModule, DOCUMENT } from "@angular/common";
import { filter } from "rxjs";
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterModule, NgxSpinnerModule, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {

    public sidebarReady = false;
    public showSidebar = true;

    constructor(public shulService: ShulService, public router: Router, @Inject(DOCUMENT) private document: Document) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                // Only show sidebar if not on /invite and not a guest
                this.showSidebar = (!this.router.url.startsWith('/invite')) && this.shulService.isAdmin;
                this.sidebarReady = true;
            }
        });

        this.router.events
            .pipe(filter(e => e instanceof NavigationStart))
            .subscribe(() => {
                this.closeAllSubmenus();
            });
    }

    onToggle(event: Event): void {
        const clicked = event.target as HTMLDetailsElement;
        if (!clicked.open) return;
        this.closeAllSubmenus(clicked);
    }

    closeAllSubmenus(except?: HTMLDetailsElement): void {
        const allDetails = this.document.querySelectorAll('details');
        allDetails.forEach(d => {
            if (d !== except) d.removeAttribute('open');
        });
    }

}