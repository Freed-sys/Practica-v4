



<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVariantesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('variantes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombre_variante');
            $table->string('desc_variante');
            $table->bigInteger('largo_variante');
            $table->bigInteger('ancho_variante');
            $table->unsignedBigInteger('material');
            $table->bigInteger('valor');
            $table->timestamps();

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
        Schema::dropIfExists('variantes');
    }
}