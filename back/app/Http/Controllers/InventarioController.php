<?php

namespace App\Http\Controllers;

use App\Models\inventarios;
use App\Models\umedidas;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Log;
use Illuminate\Support\Facades\DB;



class InventarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getMateriallList(){

        $materialList = DB::table('inventarios')
        ->join('umedidas', 'inventarios.unidad_mat', '=', 'umedidas.id')
        ->select('inventarios.nombre_mat','inventarios.tipo_mat','umedidas.abreviatura as unidad_mat', 'inventarios.cant_mat', 'inventarios.precio_unitario')
        ->get();
    
    return response()->json($materialList);
        

    }

   /*crear item*/
     
   public function crearItem(Request $request)
   {
           $medida= umedidas::where('id', $request->unidad_mat)->select('id')->first();
           //return $medida;
           inventarios::create([
              'nombre_mat' => $request['nombre_mat'],
               'tipo_mat' => $request['tipo_mat'],
               'cant_mat' => $request['cant_mat'],
               'unidad_mat' => $medida->id,
               'precio_unitario' => $request['precio_unitario']
           ]);
           return response()->json(["mensaje"=>'Elemento creado correctamente ']);
   
}

     /*editar item*/


     public function editar($id, Request $request)
     {
         $inventario = inventarios::findOrFail($id);
         $inventario->fill($request->all());
         $inventario->save();
         return response()->json('Elemento actualizado correctamente');
     }

    public function borrar($id, Request $request)
{
    $inventario = inventarios::findOrFail($id);
    $inventario->delete();
    return response()->json('Elemento eliminado correctamente');
}

   
}
