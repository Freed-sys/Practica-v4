<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class inventarios extends Model
{
    use HasFactory;
    protected $table = 'inventarios';
    protected $primaryKey = "id";
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'nombre_mat',
        'tipo_mat', //foranea de Material
        'unidad_mat', //foreanea de Umedidas
        'cant_mat',

        'precio_unitario',
    ];

    public function umedida(){
        return $this->belongsTo(Umedidas::class, 'unidad_mat', 'id');
    }
    public function material(){
        return $this->belongsTo(Material::class, 'tipo_mat', 'id');
    }
}
