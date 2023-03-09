<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ComunasController;
use App\Http\Controllers\InventarioController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\UmedidaController;
use App\Http\Controllers\CasasController;
use App\Http\Controllers\DireccionesController;
use App\Http\Controllers\EstadosController;
use App\Http\Controllers\ordenTrabajosController;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\TrabajadorController;
use App\Http\Controllers\VarianteController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/crearInv', [InventarioController::class, 'crearItem']);
Route::post('/mostrarInv', [InventarioController::class, 'getMateriallList']);
Route::post('/inventario/editar/{id}', [InventarioController::class, 'editar']);
Route::post('/inventario/borrar/{id}', [InventarioController::class, 'borrar']);
Route::post('/crearUni',[UmedidaController::class, 'create']);
Route::get('/listarUni',[UmedidaController::class, 'listaDropdown']);
Route::get('/listarCasa', [ CasasController::class, 'getCasaslList']);
Route::post('crearCasa',[CasasController::class, 'crearCasa']);
Route::post('/casas/editar{id}',[CasasController::class, 'editar']);
Route::post('/casas/borrar/{id}',[CasasController::class, 'borrar']);
Route::get('/listarCliente', [ClienteController::class, 'getClienteslList']);
Route::post('/crearCliente', [ClienteController::class, 'crearCliente']);
Route::post('/cliente/editar/{id}', [ClienteController::class, 'editar']);
Route::post('/cliente/borrar/{id}', [ClienteController::class, 'borar']);
Route::post('/crearComuna', [ComunasController::class, 'crearComuna']);
Route::get('/mostarComuna', [ComunasController::class, 'getComunaslList']);
Route::post('/listarComuna',[ComunasController::class, 'listaDropdown']);
Route::post('/comunas/editar/{id}', [ComunasController::class, 'editar']);
Route::post('/comunas/borrar/{id}', [ComunasController::class, 'borrar']);
Route::post('/crearDirec', [DireccionesController::class, 'crearDireccion']);
Route::get('/mostrarDirec', [DireccionesController::class, 'getDireccionesList']); 
Route::post('/direccion/editar/{id}', [DireccionesController::class, 'editar']);
Route::post('/direccion/borrar/{id}', [DireccionesController::class, 'borrar']);
Route::post('/listarEstado',[EstadosController::class, 'listaDropdown']);
Route::post('/crearEst', [EstadosController::class, 'crearItem']);
Route::post('/crearOrden',[ordenTrabajosController::class, 'crearOrden']);
Route::get('/mostrarOrden', [ordenTrabajosController::class, 'getOrdenList']);
Route::post('/ordenTra/editar/{id}', [ordenTrabajosController::class, 'editar']);
Route::post('/ordenTra/borrar/{id}', [ordenTrabajosController::class, 'borrar']);
Route::post('/crearRegion', [RegionController::class, 'create']);
Route::post('/region/editar/{id}', [RegionController::class, 'editar']);
Route::post('/region/borrar/{id}', [RegionController::class, 'borrar']);
Route::post('/listarRegion',[RegionController::class, 'listaDropdown']);
Route::get('/mostrarTra', [TrabajadorController::class, 'getTrabajadoresList']);
Route::post('/crearTra',[TrabajadorController::class, 'crearTra']);
Route::post('/tra/editar/{id}', [TrabajadorController::class, 'editar']);
Route::post('/tra/borrar/{id}', [TrabajadorController::class, 'borrar']);
Route::post('/crearVari', [VarianteController::class, 'crearVari']);
Route::post('/var/editar/{id}', [VarianteController::class, 'editar']);
Route::post('/var/borrar/{id}', [VarianteController::class, 'borrar']);
Route::get('/mostrarVar', [VarianteController::class, 'getVariantesList']);
Route::post('/listarVariantes',[VarianteController::class, 'listaDropdown']);
Route::get('/listarOrdenes',[ordenTrabajosController::class, 'ordenDropdown']);
