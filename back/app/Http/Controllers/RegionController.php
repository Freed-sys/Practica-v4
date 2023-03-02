<?php

namespace App\Http\Controllers;

use App\Models\region;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RegionController extends Controller
{
    public function create(Request $request)
    {
       region::create([
            'nombre_region' => $request['nombre_region'],

         ]);
        return response()->json('Elemento creado correctamente');

    }
    public function editar($id, Request $request)
    {
        $region = region::findOrFail($id);
        $region->fill($request->all());
        $region->save();
        return response()->json('Elemento actualizado correctamente');
    }



    public function borrar($id)
    {
        $region  = region::findOrFail($id);
        $region->delete();
        return response()->json('Elemento eliminado correctamente');
    }

    public function listaDropdown()
    {
        $regiones = region::all();
        $options = [];
        foreach ($regiones as $region) {
            $options[] = [
                'value' => $region->id,
                'label' => $region->nombre_region,
            ];
        }
        return response()->json([
            'options' => $options,
        ]);
    }
}
