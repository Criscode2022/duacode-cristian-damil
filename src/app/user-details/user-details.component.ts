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

  protected user: User | null = null;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = params['userId'];

      this.usersService.getUser(userId).subscribe((user) => {
        this.user = user;
      });
    });
  }

  protected goBack() {
    this.location.back();
  }
}
