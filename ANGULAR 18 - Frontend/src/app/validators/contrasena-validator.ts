import { AbstractControl, ValidatorFn } from '@angular/forms';

export function contrasenaFuerte(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const contrasena = control.value;
    if (!contrasena) return null;

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const valido = regex.test(contrasena);

    return valido ? null : { 'contrasenaFuerte': true };
  };
}
