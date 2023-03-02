<?php

namespace App\Http\Controllers;

use App\Models\cliente;
use App\Models\direcciones;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    public function getClienteslList(){
        try{
            $materialls = cliente::orderBy('id', 'DESC')->get();
            return response()->json($materialls);

        }
        catch(Exception $e){

            Log::error($e);
        }
    }

    public function crearCliente(Request $request)
    {
        $direccion= direcciones::where('id', $request->tipo)->select('id')->get();
        //return $medida;
        $casa = casas::create([
           'desc_casa' => $request['desc_casa'],
            'tipo' => $variante['id'],
            'observaciones' => $request['observaciones'],

        ]);
        return response()->json(["mensaje"=>'Elemento creado correctamente ']);
    
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
     * @param  \App\Models\cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function show(cliente $cliente)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function edit(cliente $cliente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, cliente $cliente)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function destroy(cliente $cliente)
    {
        //
    }
}
