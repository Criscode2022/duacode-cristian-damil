import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule, Location } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { UsersService } from '../core/services/users.service';
import { User } from '../core/types/user';
import { LoadingSpinnerComponent } from '../shared/components/loading-spinner/loading-spinner.component';
import { UserForm } from '../shared/forms/user.form';

@Component({
  selector: 'app-user-update',
  imports: [
    CommonModule,
    RouterModule,
    ClipboardModule,
    ReactiveFormsModule,
    LoadingSpinnerComponent,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
  ],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.scss',
})
export class UserUpdateComponent extends UserForm {
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private snackbar = inject(MatSnackBar);
  private usersService = inject(UsersService);

  protected loading = signal(false);

  protected user: User | null = null;

  ngOnInit(): void {
    this.loading.set(true);

    this.subs.add(
      this.route.params
        .pipe(
          switchMap((params) => {
            const userId = params['userId'];
            return this.usersService.getUser(userId);
          }),
        )
        .subscribe({
          next: (user) => {
            this.user = user;

            this.populateForm();
            this.loading.set(false);
          },
          error: (error) => {
            console.error(error);
            this.loading.set(false);
          },
        }),
    );
  }

  private populateForm() {
    if (!this.user) {
      return;
    }

    this.form.patchValue({
      firstName: this.user.first_name,
      lastName: this.user.last_name,
      email: this.user.email,
    });
  }

  protected save() {
    if (this.form.invalid || !this.user?.id) {
      return;
    }

    const updateDTO: Partial<User> = {
      first_name: this.firstName?.value ?? undefined,
      last_name: this.lastName?.value ?? undefined,
      email: this.email?.value ?? undefined,
    };

    this.usersService.updateUser(this.user.id, updateDTO).subscribe({
      next: () => {
        this.goBack();

        this.snackbar.open('User updated successfully', 'Close', {
          duration: 5000,
        });
      },
      error: (err) => {
        console.error('Error updating user:', err);

        this.snackbar.open('Failed to update user', 'Close', {
          duration: 5000,
        });
      },
    });
  }

  protected goBack() {
    this.location.back();
  }
}
