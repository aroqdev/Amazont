import { CanActivateFn, Router } from '@angular/router';
import { LocalService } from '../services/local.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const localService = inject(LocalService); // Inyectamos el servicio local
  const router = inject(Router); // Inyectamos el Router para redireccionar
  
  const user = localService.user; // Verificamos si el usuario está autenticado

  if (!user) {
    router.navigate(['/login']); // Redirige al login si no hay usuario
    return false; // Bloquea el acceso a la ruta actual
  }
  
  return true; // Permite el acceso si el usuario está autenticado
};
