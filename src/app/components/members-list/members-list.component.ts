import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Member } from '../../models/member.model';
import { HttpService } from '../../services/http.service';
import { finalize } from 'rxjs';

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

  constructor(private httpService: HttpService) {}

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

    

}
