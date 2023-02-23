<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdenTrabajoTable extends Migration
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
            $table->unsignedBigInteger('tipo_casa');
            $table->timestamps();

            $table->foreign('tipo_casa')->references('id')->on('variantes');



        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ordenTrabajo');
    }
}
