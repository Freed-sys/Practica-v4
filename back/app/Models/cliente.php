<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class cliente extends Model
{
    use HasFactory;
    protected $table = 'cliente';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = false;
    protected $fillable = [
        'rut_cliente',
        'nombre_ciente',
        'apellidos_cliente',
        'direccion_cliente',
        'telefono_cliente',
        'cod_orden',
    ];

public function direccion(){
    return $this->belongsToMany(direcciones::class, 'direccion_cliente', 'id' );
}

public function orden(){
    return $this->belongsToMany(ordenTrabajo::class, 'cod_orden', 'id' );

}

}