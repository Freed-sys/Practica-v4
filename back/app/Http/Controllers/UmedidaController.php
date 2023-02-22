<?php

namespace App\Http\Controllers;

use App\Models\umedidas;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UmedidaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $umedida = new umedidas();
        $umedida = umedidas::create([
            'nombre' => $request['nombre'],
             'abreviatura' => $request['abreviatura'],
         ]);
        return response()->json('Elemento creado correctamente');

    }

    public function listaDropdown()
    {
        $umedidas = umedidas::all();
        $options = [];
        foreach ($umedidas as $umedida) {
            $options[] = [
                'value' => $umedida->id,
                'label' => $umedida->nombre,
            ];
        }
        return response()->json([
            'options' => $options,
        ]);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Umedida  $umedida
     * @return \Illuminate\Http\Response
     */
    public function show(Umedida $umedida)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Umedida  $umedida
     * @return \Illuminate\Http\Response
     */
    public function edit(Umedida $umedida)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Umedida  $umedida
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Umedida $umedida)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Umedida  $umedida
     * @return \Illuminate\Http\Response
     */
    public function destroy(Umedida $umedida)
    {
        //
    }
}
