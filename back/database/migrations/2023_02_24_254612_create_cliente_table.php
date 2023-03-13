<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClienteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cliente', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('rut_cliente');
            $table->string('nombre_cliente');
            $table->string('apellidos_cliente');
            $table->unsignedBigInteger('region_id');
            $table->string('comuna');
            $table->string('direccion_cliente');
            $table->bigInteger('num_casa');
            $table->bigInteger('telefono_cliente');
            $table->string('email')->nullable()->email();
            
            
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
        Schema::dropIfExists('cliente');
    }
}
