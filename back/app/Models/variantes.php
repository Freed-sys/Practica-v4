<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class variantes extends Model
{
    use HasFactory;
    protected $table = 'variantes';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'nombre_variante',
        'desc_variante',
        'largo_variante',
        'ancho_variante',
        'material', //material será otra tabla
        'valor'
    ];



 

}
