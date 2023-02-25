<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Direcciones extends Model
{
    use HasFactory;
    protected $table = 'direcciones';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = false;
    protected $fillable = [
        'comuna',
        'id_reg',
        'nombre_calle',
        'numero_calle'
    ];
    public function region(){
        return $this->belongsTo(region::class, 'id_reg', 'id');
    }

    public function cliente(){
        return $this->belongsToMany(cliente::class, 'id', 'direccion_cliente');
    }
    public function trabajadores(){
        return $this->belongsToMany(trabajadores::class, 'id', 'direccion_tra'); 
    }
}
