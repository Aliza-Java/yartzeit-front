import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
    selector: 'app-success',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './success.component.html',
    styleUrl: './success.component.css'
})
export class SuccessComponent implements OnInit {

    type = '';

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.type = this.route.snapshot.paramMap.get('type')!;
    }

}
