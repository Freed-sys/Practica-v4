<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInventariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {


        Schema::create('inventarios', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombre_mat');
            $table->string('tipo_mat');
            $table->integer('cant_mat');
            $table->unsignedBigInteger('unidad_mat');
            $table->integer('precio_unitario');
            $table->timestamps();


            $table->foreign('unidad_mat')->references('id')->on('umedidas');


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('inventarios');
        
    }
}
