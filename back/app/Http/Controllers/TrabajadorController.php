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
        $validatedData = $request->validate([
            'rut_tra' => 'required|string',
            'nombre_tra' => 'required|string',
            'apellidos_tra' => 'required|string',
            'region_id' => 'required|exists:regiones,id',
            'comuna' => 'required|string',
            'direccion_tra' => 'required|string',
            'num_calle' => 'required|string',
            'tel_tra' => 'required|string',
            'email' => 'required|email',
        ]);
    
        $cliente = new trabajadores();
        $cliente->rut_tra = $validatedData['rut_tra'];
        $cliente->nombre_tra = $validatedData['nombre_tra'];
        $cliente->apellidos_tra = $validatedData['apellidos_tra'];
        $cliente->region_id = $validatedData['region_id'];
        $cliente->comuna = $validatedData['comuna'];
        $cliente->direccion_tra = $validatedData['direccion_tra'];
        $cliente->num_calle = $validatedData['num_calle'];
        $cliente->tel_tra = $validatedData['tel_tra'];
        $cliente->email = $validatedData['email'];
        $cliente->save();
    
        return response()->json([
            'message' => 'Ta entero de weno oe',
            'cliente' => $cliente,
        ], 201);
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
        $trabajadores = trabajadores::join('regiones', 'trabajadores.region_id', '=', 'regiones.id')
            ->select('trabajadores.*', 'regiones.nombre as region_id')
            ->orderBy('id', 'DESC')
            ->get();
    
        return response()->json($trabajadores);
    }
}
