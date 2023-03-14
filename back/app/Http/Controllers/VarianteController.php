<?php

namespace App\Http\Controllers;

use App\Models\variantes;
use App\Http\Controllers\Controller;
use App\Models\inventarios;
use Illuminate\Http\Request;

class VarianteController extends Controller
{
    public function crearVari(Request $request)
    {
        $materiales = inventarios::where('id', $request->obra)->select('id')->first();
        if (!$materiales) {
            // handle the case where the direccion is not found
            return response()->json(['error' => 'Material no encontrado'], 404);
        }
        variantes::create([
            'nombre_variante' => $request['nombre_variante'],
            'desc_variante' => $request['desc_variante'],
            'largo_variante' => $request['largo_variante'],
            'ancho_variante' => $request['ancho_variante'],
            'material' => $materiales->id, //material será otra tabla
            'valor' => $request['valor'],
            'observaciones' => $request['observaciones']
        ]);

        // return a success response
        return response()->json(['mensaje' => 'Elemento creado correctamente']);
    }


    public function editar($id, Request $request)
    {
        $orden = variantes::findOrFail($id);
        $orden->fill($request->all());
        $orden->save();
        return response()->json('Elemento actualizado correctamente');
    }
    public function borrar($id)
    {
        $orden  = variantes::findOrFail($id);
        $orden->delete();
        return response()->json('Elemento eliminado correctamente');
    }

    public function getVariantesList()
    {

        $materialls = variantes::orderBy('id', 'DESC')->get();
        return response()->json($materialls);
    }

    public function listaDropdown()
    {
        $variantes = variantes::all();
        $options = [];
        foreach ($variantes as $variante) {
            $options[] = [
                'value' => $variante->id,
                'label' => $variante->nombre_variante,
            ];
        }
        return response()->json([
            'options' => $options,
        ]);
    }
}
