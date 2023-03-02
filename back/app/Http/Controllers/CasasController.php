<?php

namespace App\Http\Controllers;


use App\Models\variantes;
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
    
            $materialls = casas::orderBy('id', 'DESC')->get();
            return response()->json($materialls);

        
     
    }

  /** Crear Casa */

    public function crearCasa(Request $request)
    {
        $variante= variantes::where('id', $request->tipo)->select('id')->get();
        //return $medida;
        $casa = casas::create([
           'desc_casa' => $request['desc_casa'],
            'tipo' => $variante['id'],
            'observaciones' => $request['observaciones'],

        ]);
        return response()->json(["mensaje"=>'Elemento creado correctamente ']);
    
 }

    /*editar item*/


    public function editar($id, Request $request)
    {
        $casa = casas::findOrFail($id);
        $casa->fill($request->all());
        $casa->save();
        return response()->json('Elemento actualizado correctamente');
    }

  

    public function borrar($id, Request $request)
    {
        $casa = casas::findOrFail($id);
        $casa->delete();
        return response()->json('Elemento eliminado correctamente');
    }
    
}
