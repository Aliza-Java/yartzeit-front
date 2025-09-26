import { Component } from "@angular/core";
import { NavigationEnd, Router, RouterModule, RouterOutlet } from "@angular/router";
import { NgxSpinnerModule } from "ngx-spinner";
import { ShulService } from "./services/shul.service";
import { CommonModule } from "@angular/common";
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

    constructor(public shulService: ShulService, public router: Router) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                // Only show sidebar if not on /invite and not a guest
                this.showSidebar = !this.router.url.startsWith('/invite') && !this.shulService.isGuest;
                this.sidebarReady = true;
            }
        });
    }
}