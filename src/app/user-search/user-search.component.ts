import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { UserSearchForm } from './user-search.form';

@Component({
  selector: 'app-user-search',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.scss',
})
export class UserSearchComponent extends UserSearchForm {
  private router = inject(Router);

  protected search() {
    const filteredValues = Object.fromEntries(
      Object.entries(this.form.value).filter(([_, value]) => value !== ''),
    );

    this.router.navigate(['/'], {
      queryParams: filteredValues,
    });
  }

  protected clear(element: string): void {
    this.form.get(element)?.reset();

    this.search();
  }

  protected reset() {
    this.form.reset();

    this.router.navigate([]);
  }
}
