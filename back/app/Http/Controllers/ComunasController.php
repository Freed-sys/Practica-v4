<?php

namespace App\Http\Controllers;

use App\Models\comunas;
use App\Models\Region;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ComunasController extends Controller
{
    public function getComunaslList()
    {

        $materialls = comunas::orderBy('id', 'DESC')->get();
        return response()->json($materialls);
    }

    public function crearComuna(Request $request)
    {
        $region = Region::where('id', $request->cod_region)->select('id')->first();
        if (!$region) {
            // region not found
            return response()->json(['error' => 'Region not found'], 404);
        }
    
        comunas::create([
            'nombre_ciudad' => $request['nombre_ciudad'],
            'cod_region' => $region->id,
        ]);
    
        // return a success response
        return response()->json(['message' => 'Comuna created'], 201);
    }


    public function listaDropdown()
    {
        $comunas = comunas::all();
        $options = [];
        foreach ($comunas as $comuna) {
            $options[] = [
                'value' => $comuna->id,
                'label' => $comuna->nombre_ciudad,
            ];
        }
        return response()->json([
            'options' => $options,
        ]);
    }


    /*editar item*/


    public function editar($id, Request $request)
    {
        $comuna = comunas::findOrFail($id);
        $comuna->fill($request->all());
        $comuna->save();
        return response()->json('Elemento actualizado correctamente');
    }

    public function borrar($id)
    {
        $comuna = comunas::findOrFail($id);
        $comuna->delete();
        return response()->json('Elemento eliminado correctamente');
    }
}
