import { Component } from "@angular/core";
import { AddMemberComponent } from "./components/add-member/add-member.component";
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [AddMemberComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'Yartzeit System';
}
