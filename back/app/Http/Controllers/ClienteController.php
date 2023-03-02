<?php

namespace App\Http\Controllers;

use App\Models\cliente;
use App\Models\direcciones;
use App\Models\ordenTrabajos;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    public function getClienteslList()
    {

        $materialls = cliente::orderBy('id', 'DESC')->get();
        return response()->json($materialls);
    }

    public function crearCliente(Request $request)
    {
        $direccion = direcciones::where('id', $request->direccion_cliente)->select('id')->first();
        if (!$direccion) {
            // handle the case where the direccion is not found
            return response()->json(['error' => 'Direccion no encontrada'], 404);
        }
    
        $orden = ordenTrabajos::where('id', $request->cod_orden)->select('id')->first();
        if (!$orden) {
            // handle the case where the orden is not found
            return response()->json(['error' => 'Orden no encontrada'], 404);
        }
    
        cliente::create([
            'rut_cliente' => $request['rut_cliente'],
            'nombre_ciente' => $request['nombre_cliente'],
            'apellidos_cliente' => $request['apellidos_cliente'],
            'direccion_cliente' => $direccion->id,
            'telefono_cliente' => $request['telefono_cliente'],
            'cod_orden' => $orden->id
        ]);
    
        // return a success response
        return response()->json(['mensaje' => 'Elemento creado correctamente']);
    }

    /*editar item*/


    public function editar($id, Request $request)
    {
        $cliente = cliente::findOrFail($id);
        $cliente->fill($request->all());
        $cliente->save();
        return response()->json('Elemento actualizado correctamente');
    }



    public function borrar($id, Request $request)
    {
        $cliente = cliente::findOrFail($id);
        $cliente->delete();
        return response()->json('Elemento eliminado correctamente');
    }
}
