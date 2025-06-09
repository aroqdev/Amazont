import { CanActivateFn, Router } from '@angular/router';
import { LocalService } from '../services/local.service';
import { inject } from '@angular/core';

export const yesautchGuard: CanActivateFn = (route, state) => {
  const localService = inject(LocalService); // Obtenemos el servicio local
  const router = inject(Router); // Obtenemos el Router para redirigir

  const user = localService.user; // Verificamos si el usuario está autenticado

  if (user) {
    router.navigate(['/profile']); // Redirige al perfil si ya está autenticado
    return false; // Bloquea el acceso a `login` o `register`
  }

  return true; // Permite el acceso si no está autenticado
};
