import { AbstractControl, ValidatorFn } from '@angular/forms';
import { UserService } from '../services/user-service.service';

export function correoNoExisteValidator(userService: UserService): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const correo = control.value;
    if (!correo) return null;

    userService.verificarCorreo(correo).subscribe({
      next: () => control.setErrors(null), // Si la API responde 200, el correo EXISTE y muestra error.
      error: () => control.setErrors({ correoNoExiste: true }) // Si la API responde 404, el correo NO existe y la validación pasa.
    });

    return null;
  };
}
