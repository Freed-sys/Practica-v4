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


    public function editar($id, Request $request)
{
    $inventario = Inventario::findOrFail($id);
    $inventario->fill($request->all());
    $inventario->save();
    return response()->json('Elemento actualizado correctamente');
}



    public function borrar($id, Request $request)
{
    $inventario = Inventario::findOrFail($id);
    $inventario->delete();
    return response()->json('Elemento eliminado correctamente');
}

}
