<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTrabajadoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trabajadores', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('rut_trabajadores');
            $table->string('nombre_tra');
            $table->string('apellidos_tra');
            $table->unsignedBigInteger('obra');
            $table->unsignedBigInteger('direccion_tra');
            $table->bigInteger('tel_tra');
            $table->timestamps();

            $table->foreign('obra')->references('id')->on('ordenTrabajos');
            $table->foreign('direccion_tra')->references('id')->on('direcciones');


            
        });


      
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('trabajadores');
    }
}
