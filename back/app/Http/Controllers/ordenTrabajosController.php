<?php

namespace App\Http\Controllers;

use App\Models\material;
use App\Models\ordenTrabajos;
use App\Models\variantes;
use App\Models\casas;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ordenTrabajosController extends Controller
{
  
   
     public function crearOrden(Request $request)
     {
         $variante = variantes::where('id', $request->valor)->select('id')->first();
         if (!$variante) {
             // handle the case where the direccion is not found
             return response()->json(['error' => 'Variante no encontrada'], 404);
         }
     
         $casa = casas::where('id', $request->casa)->select('id')->first();
         if (!$casa) {
             // handle the case where the orden is not found
             return response()->json(['error' => 'Tipo no encontrado'], 404);
         }

         $material = material::where('id', $request->material)->select('id')->first();
         if(!$material){
            return response()->json(['error' => 'Material no encontrado'], 404);
         }
     
         ordenTrabajos::create([
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

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ordenTrabajos  $ordenTrabajos
     * @return \Illuminate\Http\Response
     */
    public function show(ordenTrabajos $ordenTrabajos)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ordenTrabajos  $ordenTrabajos
     * @return \Illuminate\Http\Response
     */
    public function edit(ordenTrabajos $ordenTrabajos)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ordenTrabajos  $ordenTrabajos
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ordenTrabajos $ordenTrabajos)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ordenTrabajos  $ordenTrabajos
     * @return \Illuminate\Http\Response
     */
    public function destroy(ordenTrabajos $ordenTrabajos)
    {
        //
    }
}
