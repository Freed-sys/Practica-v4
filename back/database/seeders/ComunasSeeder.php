<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ComunasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(){
        DB::table('regiones')->insert([
            ['nombre' => 'Arica y Parinacota', 'codigo' => 'XV'],
            ['nombre' => 'Tarapacá', 'codigo' => 'I'],
            ['nombre' => 'Antofagasta', 'codigo' => 'II'],
            ['nombre' => 'Atacama', 'codigo' => 'III'],
            ['nombre' => 'Coquimbo', 'codigo' => 'IV'],
            ['nombre' => 'Valparaíso', 'codigo' => 'V'],
            ['nombre' => 'Metropolitana de Santiago', 'codigo' => 'RM'],
            ['nombre' => 'Libertador General Bernardo O\'Higgins', 'codigo' => 'VI'],
            ['nombre' => 'Maule', 'codigo' => 'VII'],
            ['nombre' => 'Ñuble', 'codigo' => 'XVI'],
            ['nombre' => 'Biobío', 'codigo' => 'VIII'],
            ['nombre' => 'La Araucanía', 'codigo' => 'IX'],
            ['nombre' => 'Los Ríos', 'codigo' => 'XIV'],
            ['nombre' => 'Los Lagos', 'codigo' => 'X'],
            ['nombre' => 'Aysén del General Carlos Ibáñez del Campo', 'codigo' => 'XI'],
            ['nombre' => 'Magallanes y de la Antártica Chilena', 'codigo' => 'XII'],
        ]);
    }
}

