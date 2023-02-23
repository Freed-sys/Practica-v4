<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class region extends Model
{
    use HasFactory;
    protected $table = 'region';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'nombre_region',
    ];

    public function callCiudad(){
        return $this->hasOne(comunas::class, 'id', 'cod_region');
        
    }


    public function callDireccion(){
        return $this->hasMany(Direcciones::class, 'id', 'id_reg');
    }

  

}