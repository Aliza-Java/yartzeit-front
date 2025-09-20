import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { HttpService } from '../../services/http.service';

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

    constructor(private httpService: HttpService) { }

    ngOnInit() {
        this.httpService.getAnniversaries().subscribe(data => {
            this.anniversaries = data;
        });
    }

    downloadPDF() {
        const doc = new jsPDF();


        autoTable(doc, {
            html: '#printTable',
            headStyles: { halign: 'left', fontSize: 14, fontStyle: 'bold' },
            didParseCell: (data) => {
                // Detect the first header row (our title row)
                if (data.section === 'head' && data.row.index === 0) {
                    data.cell.styles.fillColor = [255, 255, 255]; // white background
                    data.cell.styles.textColor = [0, 0, 0];     // black text
                    data.cell.styles.halign = 'center';   // center horizontally
                    data.cell.styles.fontSize = 16;       // bigger font
                    data.cell.styles.fontStyle = 'bold';  // bold
                }
            }
        });        

        doc.save('Anniversaries.pdf');
    }

}
