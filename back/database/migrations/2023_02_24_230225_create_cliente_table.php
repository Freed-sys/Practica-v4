<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClienteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cliente', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('rut_cliente');
            $table->string('nombre_cliente');
            $table->string('apellidos_cliente');
            $table->unsignedBigInteger('direccion_cliente');
            $table->bigInteger('telefono_cliente');
            $table->unsignedBigInteger('cod_orden');
            $table->timestamps();

            $table->foreign('direccion_cliente')->references('id')->on('direcciones');
            $table->foreign('cod_orden')->references('id')->on('ordenTrabajos');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cliente');
    }
}
