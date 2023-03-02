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
   
}
