<?php

namespace App\Http\Controllers;

use App\Models\direcciones;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DireccionesController extends Controller
{
    public function getDireccioneslList()
    {
    
            $materialls = direcciones::orderBy('id', 'DESC')->get();
            return response()->json($materialls);
    
    }

    public function editar($id, Request $request)
    {
        $direccion = direcciones::findOrFail($id);
        $direccion->fill($request->all());
        $direccion->save();
        return response()->json('Elemento actualizado correctamente');
    }

    public function borrar($id)
    {
        $direccion = direcciones::findOrFail($id);
        $direccion->delete();
        return response()->json('Elemento eliminado correctamente');
    }
}
