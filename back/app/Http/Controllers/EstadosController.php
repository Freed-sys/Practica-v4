<?php

namespace App\Http\Controllers;

use App\Models\estados;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EstadosController extends Controller
{
 
    public function listaDropdown()
    {
        $regiones = estados::select('id', 'name')->get();
        return response()->json($regiones);
    }

    public function crearItem(Request $request)
    {

                estados::create([
               'name' => $request['name']
            ]);
            return response()->json(["mensaje"=>'Elemento creado correctamente ']);
    
 }
}
