<?php

namespace App\Http\Controllers;

use App\Models\variantes;
use App\Http\Controllers\Controller;
use App\Models\inventarios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VarianteController extends Controller

{
    public function crearVari(Request $request)
    {
        // Obtener los materiales con los ids proporcionados
        $materiales = inventarios::whereIn('id', $request->material)->get();
        if ($materiales->isEmpty()) {
            // manejar el caso en que no se seleccionaron materiales
            return response()->json(['error' => 'Debe seleccionar al menos un material'], 400);
        }
    
        // Crear las variantes para cada material
        $variantes = [];
        foreach ($materiales as $material) {
            $variantes[] = [
                'nombre_variante' => $request['nombre_variante'],
                'desc_variante' => $request['desc_variante'],
                'largo_variante' => $request['largo_variante'],
                'ancho_variante' => $request['ancho_variante'],
                'material' => $material->id,
                'valor' => $request['valor'],
            ];
        }
    
        variantes::insert($variantes);
    
        // retornar una respuesta exitosa
        return response()->json(['mensaje' => 'Elemento(s) creado(s) correctamente']);
    }

    public function editar($id, Request $request)
    {
        $orden = variantes::findOrFail($id);
        $orden->fill($request->all());
        $orden->save();
        return response()->json('Elemento actualizado correctamente');
    }
    public function borrar($nombre_variante) {
        variantes::where('nombre_variante', $nombre_variante)->delete();
        return response()->json('Elementos eliminados correctamente');
    }
    
    public function getVariantesList()
    {

        $variantes = DB::table('variantes')
        ->select('variantes.nombre_variante',
                 DB::raw('GROUP_CONCAT(DISTINCT variantes.desc_variante SEPARATOR ", ") as desc_variante'),
                 DB::raw('GROUP_CONCAT(DISTINCT variantes.largo_variante SEPARATOR ", ") as largo_variante'),
                 DB::raw('GROUP_CONCAT(DISTINCT variantes.ancho_variante SEPARATOR ", ") as ancho_variante'),
                 DB::raw('GROUP_CONCAT(DISTINCT inventarios.nombre_mat SEPARATOR ", ") as material'),
                 DB::raw('GROUP_CONCAT(DISTINCT variantes.valor SEPARATOR ", ") as valor'))
        ->join('inventarios', 'inventarios.id', '=', 'variantes.material')
        ->groupBy('variantes.nombre_variante')
        ->get();

return response()->json($variantes);
    }

    public function listaDropdown()
    {
        $regiones = variantes::select('id', 'nombre_variante')->get();
        return response()->json($regiones);
    }


}
