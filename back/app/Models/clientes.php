<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class clientes extends Model
{
    use HasFactory;
    protected $table = 'clientes';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'rut_cliente',
        'nombre_cliente',
        'apellidos_cliente',
        'codigo_orden',
        'direccion_cliente',
        'telefono_cliente'
    ];

}