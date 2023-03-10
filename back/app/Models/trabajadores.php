<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class trabajadores extends Model
{
    use HasFactory;
    protected $table = 'trabajadores';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = false;
    protected $fillable=[
        'rut_tra',
        'nombre_tra',
        'apellidos_tra',
        'obra',  //foranea de orden trabajos
        'direccion_tra', //foranea de direccion
        'tel_tra'
    ];

    public function obra(){
        return $this->belongsTo(ordenTrabajos::class, 'obra', 'id');
    }

}
