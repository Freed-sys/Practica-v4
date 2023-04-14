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
            $table->string('rut_tra');
            $table->string('nombre_tra');
            $table->string('apellidos_tra');
            $table->unsignedBigInteger('region_id');
            $table->string('comuna');
            $table->string('direccion_tra');
            $table->unsignedBigInteger('num_calle');
            $table->bigInteger('tel_tra');
            $table->string('email');
            $table->timestamps();

            $table->foreign('region_id')->references('id')->on('regiones');
          


            
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
