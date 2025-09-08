import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Member } from '../../models/member.model';
import { HttpService } from '../../services/http.service';
import { finalize } from 'rxjs';
import { ShulService } from '../../services/shul.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-members-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './members-list.component.html',
    styleUrl: './members-list.component.css'
})
export class MembersListComponent implements OnInit {
    members: Member[] = [];
    isLoading = signal(false);

    constructor(private httpService: HttpService, private shulService:ShulService, private router:Router) { }

    ngOnInit() {
        this.loadMembers();
    }

    loadMembers() {
        this.isLoading.set(true);
        this.httpService.getMembers().pipe(
            finalize(() => this.isLoading.set(false))
        ).subscribe({
            next: (data: Member[]) => {
                this.members = data;
            },
            error: (err) => {
                console.error('Error loading members:', err);
            }
        });
    }

editMember(member: Member) {
  this.shulService.setSelectedMember(member);
  this.router.navigate(['/add-member'], { queryParams: { edit: true } });
}    }


