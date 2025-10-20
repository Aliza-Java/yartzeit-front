import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { HttpService } from '../../services/http.service';
import { CommonModule } from '@angular/common';

import { saveAs } from 'file-saver';
import { Workbook } from 'exceljs';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type PrintActionType = 'pdf' | 'excel';

export interface PrintRequest {
    type: PrintActionType;
    title: string;
    tableHtml: string;
}

@Injectable({ providedIn: 'root' })
export class PrintService {

    download(type: PrintActionType, title: string, tableId: string) {
        const table = document.getElementById(tableId);
        if (!table) {
            console.error('Table not found:', tableId);
            return;
        }

        if (type === 'excel') {
            this.downloadExcel(title, table);
        } else if (type === 'pdf') {
            this.downloadPdf(title, table);
        }
    }

    downloadPdf(title: string, table: HTMLElement) {
        const doc = new jsPDF();

        autoTable(doc, {
            html: table as HTMLTableElement,
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

        doc.save(`${title}.pdf`);
    }

    downloadExcel(title: string, table: HTMLElement) {
        // Create a new workbook and worksheet
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet(title);

        // Example: get table data from DOM
        const rows = Array.from(table.querySelectorAll('tr')).map(tr =>
            Array.from(tr.querySelectorAll('th, td')).map(td => td.textContent)
        );

        // Add all rows to worksheet
        rows.forEach(r => worksheet.addRow(r));

        // === STYLE TOP ROWS ===
        const titleRow = worksheet.getRow(1);
        titleRow.font = { bold: true, size: 14, underline: true };
        titleRow.alignment = { horizontal: 'center' };

        const headerRow = worksheet.getRow(2);
        headerRow.font = { bold: true, underline: true };
        headerRow.alignment = { horizontal: 'center' };

        // === SET FIXED COLUMN WIDTHS ===
        worksheet.columns.forEach((col) => {
            col.width = 16; // or any number of your choice
        });

        // Merge cells A1 through last column 
        const lastColumnLetter = worksheet.getColumn(worksheet.columns.length).letter;
        worksheet.mergeCells(`A1:${lastColumnLetter}1`);

        workbook.xlsx.writeBuffer().then(buffer => {
            const blob = new Blob([buffer], {
                type:
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            saveAs(blob, `${title}.xlsx`);
        });
    }
}
