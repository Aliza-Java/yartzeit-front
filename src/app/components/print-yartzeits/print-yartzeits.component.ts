import { Component } from '@angular/core';

import { HttpService } from '../../services/http.service';
import { CommonModule } from '@angular/common';

import { PrintService } from '../print/print.service';


@Component({
    selector: 'app-print-yartzeits',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './print-yartzeits.component.html',
    styleUrls: ['./print-yartzeits.component.css',
        '../print/print-global-styles.css']
})
export class PrintYartzeitsComponent {

    yartzeits: any[] | null = null;

    constructor(private httpService: HttpService, private printService: PrintService) { }

    ngOnInit() {
        this.httpService.getYartzeits().subscribe(data => {
            this.yartzeits = data;
        });
    }

    downloadPdf() {
        this.printService.download('pdf', 'Yartzeits', 'yartzeit-table');
    }

    downloadExcel() {
        this.printService.download('excel', 'Yartzeits', 'yartzeit-table');
    }
}