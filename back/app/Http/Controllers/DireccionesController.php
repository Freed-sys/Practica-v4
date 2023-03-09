<?php

namespace App\Http\Controllers;

use App\Models\direcciones;
use App\Models\Region;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DireccionesController extends Controller
{
    public function getDireccionesList()
{
    $direcciones = direcciones::all();
    $options = [];
    foreach ($direcciones as $direccion) {
        $options[] = [
            'value' => $direccion->id,
            'label' => $direccion->calle . ' ' . $direccion->num_calle,
        ];
    }
    return response()->json([
        'options' => $options,
    ]);

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

    public function crearDireccion(Request $request)
    {
        $region = Region::where('id', $request->id_reg)->select('id')->first();
        if (!$region) {
            // region not found
            return response()->json(['error' => 'Region not found'], 404);
        }
    
        Region::create([
            'comuna' => $request['comuna'],
            'id_reg' => $region->id, 
            'nombre_calle' => $request['nombre_calle'],
            'num_calle' => $request['num_calle'],
        ]);
    
        // return a success response
        return response()->json(['message' => 'Comuna created'], 201);
    }
}
