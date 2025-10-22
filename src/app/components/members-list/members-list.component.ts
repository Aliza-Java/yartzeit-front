import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { Member } from '../../models/member.model';
import { HttpService } from '../../services/http.service';
import { finalize } from 'rxjs';
import { ShulService } from '../../services/shul.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-members-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './members-list.component.html',
    styleUrl: './members-list.component.css'
})
export class MembersListComponent implements OnInit {

    title: string = 'Member Details';

    type: 'member' | 'supporter' = 'member';
    members: Member[] = [];
    isLoading = signal(false);

    constructor(private httpService: HttpService, private shulService: ShulService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.title = data['title'];
            this.type = data['type'];
            this.loadMembers();
        });
    }

    loadMembers() {
        this.isLoading.set(true);

        if (this.type === 'supporter') {
            this.httpService.getSupporters().pipe(
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
        else { //type === 'member'
            this.httpService.getMembers().pipe(
                finalize(() => this.isLoading.set(false))
            ).subscribe({
                next: (data: Member[]) => {
                    this.members = data;
                },
                error: (err) => {
                    console.error('Error loading supporters:', err);
                }
            });
        }
    }

    editMember(member: Member) {
        this.shulService.setSelectedMember(member);
        if (this.type === 'supporter') {
            this.router.navigate(['add-supporter'], { queryParams: { edit: true } });
        }
        else {
            this.router.navigate(['add-member'], { queryParams: { edit: true } });
        }
    }
}


