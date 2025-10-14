import { AbstractControl } from '@angular/forms';

export function matchPasswordValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const password = control.root.get('password');
  const confirmPassword = control.value;
  if (password && confirmPassword !== password.value) {
    return { message: 'passwordMustMatch' };
  }

  return null;
}
