<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Carrito;
use App\Models\Compra;
use App\Models\Producto;

class CompraController extends Controller
{
    // Mostrar todas las compras de un usuario
    public function mostrarCompra($user_id)
    {
        $productos = Compra::with('producto')
        ->where('user_id', $user_id)
        ->get();

        if ($productos->isEmpty()) {
            return response()->json(['message' => 'No se encontraron compras', 'status' => 404], 404);
        }

        return response()->json(['productos' => $productos, 'status' => 200], 200);
    }

    // Mostrar las ventas de un usuario según los productos que ha publicado
    public function mostrarVentas($user_id)
    {
        $productos = Compra::with('producto')
        ->whereHas('producto', function ($query) use ($user_id) {
            $query->where('user_id', $user_id);
        })
        ->get();

        if ($productos->isEmpty()) {
            return response()->json(['message' => 'No se encontraron ventas', 'status' => 404], 404);
        }

        return response()->json(['productos' => $productos, 'status' => 200], 200);
    }

    // Obtener el total gastado en compras de un usuario
    public function totalCompra($user_id)
    {
        $total = Compra::where('user_id', $user_id)->sum('total');

        return response()->json(['total' => $total, 'status' => 200], 200);
    }

    // Obtener el total ganado en ventas por los productos del usuario
    public function totalVenta($user_id)
    {
        $total = Compra::whereHas('producto', function ($query) use ($user_id) {
            $query->where('user_id', $user_id);
        })->sum('total');

        return response()->json(['total' => $total, 'status' => 200], 200);
    }
}
