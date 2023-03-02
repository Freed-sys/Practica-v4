<?php

namespace App\Http\Controllers;

use App\Models\casas;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CasasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getCasaslList(){
        try{
            $casass = casas::orderBy('id', 'DESC')->get();
            return response()->json(casass);

        }
        catch(Exception $e){

            Log::error($e);
        }
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
     * @param  \App\Models\casas  $casas
     * @return \Illuminate\Http\Response
     */
    public function show(casas $casas)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\casas  $casas
     * @return \Illuminate\Http\Response
     */
    public function edit(casas $casas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\casas  $casas
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, casas $casas)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\casas  $casas
     * @return \Illuminate\Http\Response
     */
    public function destroy(casas $casas)
    {
        //
    }
}
