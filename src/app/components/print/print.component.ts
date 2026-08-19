import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShulService } from '../../services/shul.service';

@Component({
    selector: 'app-print',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './print.component.html',
    styleUrl: './print.component.css'
})
export class PrintComponent {

    constructor(private shulService: ShulService) {
        this.shulService.isAdmin = true;
     }
}
