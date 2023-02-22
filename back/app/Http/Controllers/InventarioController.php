<?php

namespace App\Http\Controllers;

use App\Models\inventarios;
use App\Models\umedidas;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class InventarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getMateriallList(){
        try{
            $materialls = inventarios::orderBy('id', 'DESC')->get();
            return response()->json($materialls);

        }
        catch(Exception $e){

            Log::error($e);
        }
    }

   /*crear item*/
     
   public function crearItem(Request $request)
   {
           $medida= umedidas::where('id', $request->tipo_mat)->select('id')->first();
           //return $medida;
           $inventario = inventarios::create([
              'nombre_mat' => $request['nombre_mat'],
               'tipo_mat' => $medida['id'],
               'cant_mat' => $request['cant_mat'],
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

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\inventarios  $inventarios
     * @return \Illuminate\Http\Response
     */
    public function edit(inventarios $inventarios)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\inventarios  $inventarios
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, inventarios $inventarios)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\inventarios  $inventarios
     * @return \Illuminate\Http\Response
     */
    public function destroy(inventarios $inventarios)
    {
        //
    }
}
