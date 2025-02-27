import { inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ErrorMessages } from '../core/types/error-messages';

export class UserSearchForm {
  private fb = inject(FormBuilder);

  protected errorMessages = new ErrorMessages();

  private skeleton = {
    firstName: ['', [Validators.maxLength(50)]],
    lastName: ['', [Validators.maxLength(50)]],
    email: ['', [Validators.maxLength(50)]],
  };

  protected form = this.fb.group(this.skeleton, {
    validators: [this.SomeValueValidator()],
  });

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get email() {
    return this.form.get('email');
  }

  private SomeValueValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const { firstName, lastName, email } = control.value;
      return firstName || lastName || email
        ? null
        : { atLeastOneRequired: true };
    };
  }
}
