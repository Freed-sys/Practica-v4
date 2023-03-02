<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ComunasController;
use App\Http\Controllers\InventarioController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\UmedidaController;
use App\Http\Controllers\CasasController;

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
Route::post('/listarUni',[UmedidaController::class, 'listaDropdown']);
Route::get('/listarCasa', [ CasasController::class, 'getCasaslList']);
Route::post('crearCasa',[CasasController::class, 'crearCasa']);
Route::post('/casas/editar{id}',[CasasController::class, 'editar']);
Route::post('/casas/borrar/{id}',[CasasController::class, 'borrar']);
Route::get('/listarCliente', [ClienteController::class, 'getClienteslList']);
Route::post('/crearCliente', [ClienteController::class, 'crearCliente']);
Route::post('/cliente/editar/{id}', [ClienteController::class, 'editar']);
Route::post('/cliente/borrar/{id}', [ClienteController::class, 'borar']);
Route::get('/mostarComuna', [ComunasController::class, 'getComunaslList']);
Route::post('/listarComuna',[ComunasController::class, 'listaDropdown']);
Route::post('/comunas/editar/{id}', [ComunasController::class, 'editar']);
Route::post('/comunas/borrar/{id}', [ComunasController::class, 'borrar']);
