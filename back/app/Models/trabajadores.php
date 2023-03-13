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
        'region_id', //foranea de region
        'comuna',
        'direccion_tra', 
        'num_calle',
        'tel_tra',
        'email',
    ];

    public function obra(){
        return $this->hasOne(ordenTrabajos::class, 'id', 'id_trabajador');
    }

}
