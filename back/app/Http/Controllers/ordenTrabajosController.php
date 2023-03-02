<?php

namespace App\Http\Controllers;

use App\Models\material;
use App\Models\ordenTrabajos;
use App\Models\variantes;
use App\Models\casas;
use App\Http\Controllers\Controller;
use App\Models\estados;
use Illuminate\Http\Request;

class ordenTrabajosController extends Controller
{


    public function crearOrden(Request $request)
    {
        $variante = variantes::where('id', $request->valor)->select('id')->first();
        if (!$variante) {
            // handle the case where the direccion is not found
            return response()->json(['error' => 'Variante no encontrada'], 404);
        }

        $casa = casas::where('id', $request->casa)->select('id')->first();
        if (!$casa) {
            // handle the case where the orden is not found
            return response()->json(['error' => 'Tipo no encontrado'], 404);
        }

        $material = material::where('id', $request->material)->select('id')->first();
        if (!$material) {
            return response()->json(['error' => 'Material no encontrado'], 404);
        }

        $estado = estados::where('id', $request->estado)->select('id')->first();
        if (!$estado) {
            return response()->json(['error' => 'estado no encontrado'], 404);
        }

        ordenTrabajos::create([
            'valor' => $variante->id, //foranea de variante
            'casa' => $casa->id, //foranea de casa
            'material' => $material->id, //foranea de material
            'estado' => $estado->id, //foranea de estado
        ]);

        // return a success response
        return response()->json(['mensaje' => 'Elemento creado correctamente']);
    }

    public function editar($id, Request $request)
    {
        $orden = ordenTrabajos::findOrFail($id);
        $orden->fill($request->all());
        $orden->save();
        return response()->json('Elemento actualizado correctamente');
    }



    public function borrar($id, Request $request)
    {
        $orden  = ordenTrabajos::findOrFail($id);
        $orden->delete();
        return response()->json('Elemento eliminado correctamente');
    }

    public function getOrdenList(){
    
        $materialls = ordenTrabajos::orderBy('id', 'DESC')->get();
        return response()->json($materialls);

    
 
}

 
}
