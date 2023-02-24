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
        Schema::create('ordenTrabajos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('valor');
            $table->unsignedBigInteger('casa');
            $table->unsignedBigInteger('material');
            $table->string('estado');
            $table->timestamps();


            $table->foreign('valor')->references('id')->on('variantes');
            $table->foreign('material')->references('id')->on('materiales');


    
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ordenTrabajos');
    }
}
