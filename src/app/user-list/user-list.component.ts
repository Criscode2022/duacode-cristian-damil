import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from '../core/services/users.service';
import { User } from '../core/types/user';
import { UserForm } from '../shared/forms/user.form';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-user-list',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    UserComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  private usersService = inject(UsersService);

  protected users: User[] = [];

  ngOnInit(): void {
    this.usersService.getUsers(1).subscribe((users) => {
      this.users = users;
    });
  }

  protected openDialog(): void {
    this.dialog.open(CreateDialog);
  }
}

@Component({
  selector: 'create-dialog',
  templateUrl: 'templates/create-dialog.html',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class CreateDialog extends UserForm {
  readonly dialogRef = inject(MatDialogRef<CreateDialog>);

  private usersService = inject(UsersService);
  private snackbar = inject(MatSnackBar);

  protected onNoClick(): void {
    this.dialogRef.close();
  }

  protected save() {
    if (this.form.invalid) {
      return;
    }

    const createDTO: Partial<User> = {
      first_name: this.firstName?.value ?? undefined,
      last_name: this.lastName?.value ?? undefined,
      email: this.email?.value ?? undefined,
    };

    this.usersService.createUser(createDTO).subscribe({
      next: (response) => {
        const userId = response.id;

        this.snackbar.open(
          'User successfully created with ID: ' + userId,
          'Close',
          {
            duration: 5000,
          },
        );
      },
      error: (err) => {
        console.error('Error creating user:', err);

        this.snackbar.open('Failed to create user', 'Close', {
          duration: 5000,
        });
      },
    });
  }
}
