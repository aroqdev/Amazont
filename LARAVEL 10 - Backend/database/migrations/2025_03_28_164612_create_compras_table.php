<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('compras', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable(); // Nueva columna para almacenar el id del usuario
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null'); // Establecemos la relación con la tabla usuarios
            $table->unsignedBigInteger('prod_id');
            $table->foreign('prod_id')->references('id')->on('productos')->onDelete('set null');
            $table->integer('cantidad');
            $table->decimal('precio_producto', 8, 2);
            $table->decimal('total', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('compras');
    }
};
