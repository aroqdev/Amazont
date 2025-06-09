import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalService } from '../services/local.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const localService = inject(LocalService); // Inyectamos el servicio local
  const router = inject(Router); // Inyectamos el Router para redirigir

  const user = localService.user; // Obtenemos el usuario actual
  const requiredRole = route.data?.['role']; // Extraemos el rol requerido de la ruta

  if (user?.rol !== requiredRole) {
    router.navigate(['/profile']); // Redirige al perfil si no cumple con el rol
    return false; // Bloquea el acceso
  }

  return true; // Permite el acceso si el rol coincide
};
