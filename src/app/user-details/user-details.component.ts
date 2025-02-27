import { ClipboardModule } from '@angular/cdk/clipboard';
import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { SubsManagerDirective } from '../core/directives/subs-manager/subs-manager.directive';
import { UsersService } from '../core/services/users.service';
import { User } from '../core/types/user';

@Component({
  selector: 'app-user-details',
  imports: [
    RouterModule,
    ClipboardModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent
  extends SubsManagerDirective
  implements OnInit
{
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);
  private snackbar = inject(MatSnackBar);
  private usersService = inject(UsersService);

  protected userId = 0;
  protected user: User | null = null;

  ngOnInit(): void {
    this.subs.add(
      this.route.params
        .pipe(
          switchMap((params) => {
            this.userId = params['userId'];
            return this.usersService.getUser(this.userId);
          }),
        )
        .subscribe({
          next: (user) => {
            this.user = user;
          },
          error: (error) => {
            console.error(error);
          },
        }),
    );
  }

  protected delete() {
    if (!this.userId) {
      return;
    }

    this.usersService.deleteUser(this.userId).subscribe({
      next: () => {
        this.router.navigate(['/']);

        this.snackbar.open('User deleted successfully', 'Close', {
          duration: 5000,
        });
      },
      error: () =>
        this.snackbar.open('Failed to delete user', 'Close', {
          duration: 5000,
        }),
    });
  }

  protected goBack() {
    this.location.back();
  }
}
