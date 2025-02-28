import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h2 mat-dialog-title>Confirm</h2>
    <mat-dialog-content
      >Are you sure you want to delete this user? This action CANNOT be
      undone</mat-dialog-content
    >
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>No</button>
      <button mat-button color="warn" [mat-dialog-close]="true">Yes</button>
    </mat-dialog-actions>
  `,
  imports: [MatButtonModule, MatDialogModule],
})
export class ConfirmDialogComponent {}
