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
        'region_id', //foranea de region 
        'telefono_cliente',
        'cod_orden',
    ];

public function orden(){
    return $this->belongsTo(ordenTrabajo::class, 'cod_orden', 'id' );

}

public function region(){
    return $this->belongsTo(Region::class, 'region_id', 'id' );
}

}