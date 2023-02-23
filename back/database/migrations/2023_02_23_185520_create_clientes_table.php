<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
<<<<<<< HEAD

    

        Schema::create('clientes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('rut_cliente');
            $table->string('nombre_cliente');
            $table->string('apellidos_cliente');
            $table->unsignedBigInteger('codigo_orden');
            $table->unsignedBigInteger('direccion_cliente');
            $table->string('telefono_cliente');

            $table->foreign('direccion_cliente')->references('id')->on('direcciones');           
        });

=======
        Schema::create('clientes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });
>>>>>>> parent of 3cc6997 (Orden Trabajo y clientes)
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clientes');
<<<<<<< HEAD

=======
>>>>>>> parent of 3cc6997 (Orden Trabajo y clientes)
    }
}
