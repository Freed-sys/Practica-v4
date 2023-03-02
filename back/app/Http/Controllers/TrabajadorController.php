<?php

namespace App\Http\Controllers;

use App\Models\trabajadores;
use App\Http\Controllers\Controller;
use App\Models\Direcciones;
use App\Models\ordenTrabajos;
use Illuminate\Http\Request;

class TrabajadorController extends Controller
{
    public function crearTra(Request $request)
    {
        $orden = ordenTrabajos::where('id', $request->obra)->select('id')->first();
        if (!$orden) {
            // handle the case where the direccion is not found
            return response()->json(['error' => 'Obra no encontrada'], 404);
        }

        $direccion = Direcciones::where('id', $request->direccion_tra)->select('id')->first();
        if (!$direccion) {
            // handle the case where the orden is not found
            return response()->json(['error' => 'Direccion no encontrado'], 404);
        }



        ordenTrabajos::create([
            'rut_tra' => $request['rut_tra'],
            'nombre_tra' => $request['nombre_tra'],
            'apellidos_tra' => $request['apellidos_tra'],
            'obra' => $orden->id,
            'direccion_tra' => $direccion->id,
            'tel_tra' => $request['tel_tra'],
        ]);

        // return a success response
        return response()->json(['mensaje' => 'Elemento creado correctamente']);
    }

    public function editar($id, Request $request)
    {
        $orden = trabajadores::findOrFail($id);
        $orden->fill($request->all());
        $orden->save();
        return response()->json('Elemento actualizado correctamente');
    }



    public function borrar($id)
    {
        $orden  = trabajadores::findOrFail($id);
        $orden->delete();
        return response()->json('Elemento eliminado correctamente');
    }

    public function getTrabajadoresList()
    {

        $materialls = trabajadores::orderBy('id', 'DESC')->get();
        return response()->json($materialls);
    }
}
