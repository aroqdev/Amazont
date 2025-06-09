<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Verificar si el usuario está autenticado
        if ($request->user()->rol === 'Vendedor') {
            return $next($request); // Continuar si el rol es 'Vendedor'
        }

        // Si no es 'Vendedor', denegar el acceso
        return response()->json(['message' => 'Acceso denegado: solo para Vendedores'], 403);
    }
}