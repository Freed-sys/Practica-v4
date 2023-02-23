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

        Schema::create('ordenTrabajo', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('valor');
            $table->string('tipo_casa');
            $table->string('material'); //esta será la id de la tabla material, debe ser has many
            $table->timestamps();
        });

        Schema::create('clientes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('rut_cliente');
            $table->string('nombre_cliente');
            $table->string('apellidos_cliente');
            $table->unsignedBigInteger('codigo_orden');
            $table->unsignedBigInteger('direccion_cliente');
            $table->string('telefono_cliente');

            $table->foreign('direccion_cliente')->references('id')->on('direcciones');
            $table->foreign('codigo_orden')->references('id')->on('ordenTrabajo');
           
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clientes');
        Schema::dropIfExists('ordenTrabajo');
    }
}
