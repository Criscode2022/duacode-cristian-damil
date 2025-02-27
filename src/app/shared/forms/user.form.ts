import { inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SubsManagerDirective } from '../../core/directives/subs-manager/subs-manager.directive';
import { ErrorMessages } from '../../core/types/error-messages';

export class UserForm extends SubsManagerDirective {
  private fb = inject(FormBuilder);

  protected errorMessages = new ErrorMessages();

  private skeleton = {
    firstName: ['', [Validators.required, Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.maxLength(50)]],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(50)],
    ],
  };

  protected form = this.fb.group(this.skeleton);

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get email() {
    return this.form.get('email');
  }
}
