import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { CommonModule } from '@angular/common';

import { PrintService } from '../print/print.service';


@Component({
    selector: 'app-print-bmparashot',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './print-bmparashot.component.html',
    styleUrls: ['./print-bmparashot.component.css',
        '../print/print-global-styles.css']
})
export class PrintBmparashotComponent {

    bmparashot: any[] | null = null;

    constructor(private httpService: HttpService, private printService: PrintService) { }

    ngOnInit() {
        this.httpService.getParashot().subscribe(data => {
            this.bmparashot = data;
        });
    }

    downloadPdf() {
        this.printService.download('pdf', 'Bar-Mitzva-Parashot', 'bmp-table');
    }

    downloadExcel() {
        this.printService.download('excel', 'Bar-Mitzva-Parashot', 'bmp-table');
    }

}
