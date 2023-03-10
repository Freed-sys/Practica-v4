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
        'nombre_cliente',
        'apellidos_cliente',    
        'region_id', //foranea de region 
        'direccion_cliente',
        'telefono_cliente',
    ];


public function region(){
    return $this->belongsTo(Region::class, 'region_id', 'id' );
}

}