<?php

namespace App\Http\Controllers;

use App\Models\estados;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EstadosController extends Controller
{
 
    public function listaDropdown()
    {
        $estados = estados::all();
        $options = [];
        foreach ($estados as $estado) {
            $options[] = [
                'value' => $estado->id,
                'label' => $estado->name,
            ];
        }
        return response()->json([
            'options' => $options,
        ]);
    }

    public function crearItem(Request $request)
    {

                estados::create([
               'name' => $request['name']
            ]);
            return response()->json(["mensaje"=>'Elemento creado correctamente ']);
    
 }
}
