<?php

namespace App\Http\Controllers;

use App\Models\comunas;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ComunasController extends Controller
{
    public function getComunaslList()
    {

            $materialls = comunas::orderBy('id', 'DESC')->get();
            return response()->json($materialls);


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
