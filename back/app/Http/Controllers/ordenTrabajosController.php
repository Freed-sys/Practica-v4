<?php

namespace App\Http\Controllers;


use App\Models\ordenTrabajos;
use App\Models\variantes;
use App\Models\casas;
use App\Http\Controllers\Controller;
use App\Models\cliente;
use App\Models\estados;
use App\Models\inventarios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ordenTrabajosController extends Controller
{


    public function crearOrden(Request $request)
    {
        $cliente = cliente::where('id', $request->cliente)->select('id')->first();
        if (!$cliente) {
            // handle the case where the direccion is not found
            return response()->json(['error' => 'Cliente no encontrado'], 404);
        }

        $variante = variantes::where('id', $request->variante)->select('id')->first();
        if (!$variante) {
            // handle the case where the direccion is not found
            return response()->json(['error' => 'Variante no encontrada'], 404);
        }



        $estado = estados::where('id', $request->estado)->select('id')->first();
        if (!$estado) {
            return response()->json(['error' => 'estado no encontrado'], 404);
        }

        ordenTrabajos::create([
            'cliente' => $cliente->id,
            'variante' => $variante->id, //foranea de variante
            'estado' => $estado->id, //foranea de estado
            'observaciones' =>$request['observaciones'],
        ]);

        // return a success response
        return response()->json(['mensaje' => 'Elemento creado correctamente']);
    }

    public function editar($id, Request $request)
    {
        $orden = ordenTrabajos::findOrFail($id);
        $orden->fill($request->all());
        $orden->save();
        return response()->json('Elemento actualizado correctamente');
    }



    public function borrar($id, Request $request)
    {
        $orden  = ordenTrabajos::findOrFail($id);
        $orden->delete();
        return response()->json('Elemento eliminado correctamente');
    }

    public function getOrdenList()
    {

        $ordenes = DB::table('OrdenTrabajos')
            ->join('cliente', 'OrdenTrabajos.cliente', '=', 'cliente.id')
            ->join('variantes', 'OrdenTrabajos.variante', '=', 'variantes.id')

            ->join('estados', 'OrdenTrabajos.estado', '=', 'estados.id')
            ->select('ordenTrabajos.id', 'cliente.nombre_cliente','cliente.apellidos_cliente', 'variantes.nombre_variante', 'estados.name' , 'ordenTrabajos.observaciones')
            ->get();

        return $ordenes;
    }
}
