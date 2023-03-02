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

        Schema::create('materiales', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombre_material');
            $table->bigInteger('cantidad_material');
            $table->unsignedBigInteger('u_medida');
            $table->timestamps();

            $table->foreign('u_medida')->references('id')->on('umedidas');



        });

        Schema::create('inventarios', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombre_mat');
            $table->unsignedBigInteger('tipo_mat');
            $table->unsignedBigInteger('unidad_mat');
            $table->integer('cant_mat');
            $table->integer('precio_unitario');
            $table->timestamps();


            $table->foreign('tipo_mat')->references('id')->on('materiales');
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
        Schema::dropIfExists('materiales');
        Schema::dropIfExists('inventarios');
    }
}
