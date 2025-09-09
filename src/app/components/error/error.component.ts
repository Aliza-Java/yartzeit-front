import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LowerCasePipe} from '@angular/common';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [LowerCasePipe],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
    text: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.text = params['text'] || 'an error occurred.';
    });
  }

}
