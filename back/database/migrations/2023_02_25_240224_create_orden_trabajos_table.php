<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdenTrabajosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('casas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('tipo');
            $table->string('observaciones');
            $table->timestamps();

            $table->foreign('tipo')->references('id')->on('variantes');
        });

        Schema::create('estados', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('ordenTrabajos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('cliente');
            $table->unsignedBigInteger('valor');
            $table->unsignedBigInteger('material');
            $table->unsignedBigInteger('estado');
            $table->timestamps();

            $table->foreign('cliente')->references('id')->on('cliente');
            $table->foreign('valor')->references('id')->on('variantes');
            $table->foreign('material')->references('id')->on('inventarios');
            $table->foreign('estado')->references('id')->on('estados');
  
          
    
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('casas');
        Schema::dropIfExists('estados');
        Schema::dropIfExists('ordenTrabajos');
        
    }
}
