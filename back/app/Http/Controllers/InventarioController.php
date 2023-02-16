<?php

namespace App\Http\Controllers;

use App\Models\Inventario;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class InventarioController extends Controller
{
   
    public function getMateriallList(){
        try{
            $materialls = Inventario::orderBy('id', 'DESC')->get();
            return response()->json($materialls);

        }
        catch(Exception $e){

            Log::error($e);
        }
    }

/*crear item*/
     
    public function crearItem(Request $request)
    {
        {   
        
            $inventario = new Inventario();
            $inventario->nombre_mat = $request['nombre_mat'];
            $inventario->tipo_mat = $request['tipo_mat'];
            $inventario->cant_mat = $request['cant_mat'];
            $inventario->precio_unitario = $request['precio_unitario'];

            $inventario->save();
        
            return response()->json(['message' => 'Inventario creado con exito'], 201);
        }
    }

    /*editar item*/


    public function edit(Request $request)
    {
        $inventario = Inventario::find($request->id);

    if (!$inventario) {
        return response()->json(['message' => 'No se encontro el inventario'], 404);
    }

    $inventario->nombre_mat = $request->input('nombre_mat');
    $inventario->tipo_mat = $request->input('tipo_mat');
    $inventario->cant_mat = $request->input('cant_mat');
    $inventario->precio_unitario = $request->input('precio_unitario');
    $inventario->save();

    return response()->json(['message' => 'Inventario actualizado con exito'], 200);
    }



    public function borrar($id, Request $request)
    {
        $inventario = Inventario::find($id);

        if (!$inventario) {
            return response()->json(['message' => 'No se encontró el inventario'], 404);
        }
    
        $inventario->delete();
        return response()->json(['message' => 'Elemento de inventario eliminado correctamente'], 200);
    }
}
