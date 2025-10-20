import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';

import { PrintService } from '../print/print.service';

@Component({
    selector: 'app-print-ann',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './print-ann.component.html',
    styleUrls: ['./print-ann.component.css',
        '../print/print-global-styles.css']
})
export class PrintAnnComponent {

    anniversaries: any[] | null = null;

    constructor(private httpService: HttpService, private printService: PrintService) { }

    ngOnInit() {
        this.httpService.getAnniversaries().subscribe(data => {
            this.anniversaries = data;
        });
    }

    downloadPdf() {
        this.printService.download('pdf', 'Anniversaries', 'ann-table');
    }

    downloadExcel() {
        this.printService.download('excel', 'Anniversaries', 'ann-table');
    }
}
