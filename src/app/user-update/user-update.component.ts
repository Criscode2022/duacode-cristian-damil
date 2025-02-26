import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UsersService } from '../core/services/users.service';
import { User } from '../core/types/user';
import { UserUpdateForm } from './user-update.form';

@Component({
  selector: 'app-user-update',
  imports: [
    CommonModule,
    RouterModule,
    ClipboardModule,
    ReactiveFormsModule,
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
export class UserUpdateComponent extends UserUpdateForm {
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private usersService = inject(UsersService);

  protected user: User | null = null;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = params['userId'];

      this.usersService.getUser(userId).subscribe((user) => {
        this.user = user;
        this.populateForm();
      });
    });
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

  protected saveChanges() {
    if (this.form.invalid || !this.user?.id) {
      return;
    }

    const updateDTO: Partial<User> = {
      first_name: this.firstName?.value ?? undefined,
      last_name: this.lastName?.value ?? undefined,
      email: this.email?.value ?? undefined,
    };

    this.usersService.updateUser(this.user.id, updateDTO).subscribe({
      next: () => this.goBack(),
      error: (err) => console.error('Error updating user:', err),
    });
  }

  protected goBack() {
    this.location.back();
  }
}
