import { ClipboardModule } from '@angular/cdk/clipboard';
import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UsersService } from '../core/services/users.service';
import { User } from '../core/types/user';

@Component({
  selector: 'app-user-details',
  imports: [
    ClipboardModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule,
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private usersService = inject(UsersService);

  protected userId = 0;
  protected user: User | null = null;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['userId'];

      this.usersService.getUser(this.userId).subscribe((user) => {
        this.user = user;
      });
    });
  }

  protected delete() {
    if (!this.userId) {
      return;
    }

    this.usersService.deleteUser(this.userId).subscribe({
      next: () => console.log('User deleted successfully'),
      error: (error) => console.error('Error deleting user', error),
    });
  }

  protected goBack() {
    this.location.back();
  }
}
