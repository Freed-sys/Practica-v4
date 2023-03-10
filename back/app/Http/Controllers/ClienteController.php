<?php

namespace App\Http\Controllers;

use App\Models\cliente;
use App\Models\Region;
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
        $validatedData = $request->validate([
            'rut_cliente' => 'required|string',
            'nombre_cliente' => 'required|string',
            'apellidos_cliente' => 'required|string',
            'region_id' => 'required|exists:regiones,id',
            'direccion_cliente' => 'required|string',
            'telefono_cliente' => 'required|string',
            'cod_orden' => 'required|exists:ordenTrabajos,id',
        ]);
    
        $cliente = new Cliente;
        $cliente->rut_cliente = $validatedData['rut_cliente'];
        $cliente->nombre_cliente = $validatedData['nombre_cliente'];
        $cliente->apellidos_cliente = $validatedData['apellidos_cliente'];
        $cliente->region_id = $validatedData['region_id'];
        $cliente->direccion_cliente = $validatedData['direccion_cliente'];
        $cliente->telefono_cliente = $validatedData['telefono_cliente'];
        $cliente->cod_orden = $validatedData['cod_orden'];
        $cliente->save();
    
        return response()->json([
            'message' => 'Cliente creado correctamente',
            'cliente' => $cliente,
        ], 201);
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
