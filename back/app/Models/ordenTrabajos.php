<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ordenTrabajos extends Model
{
    use HasFactory;
    protected $table = 'ordenTrabajos';
    protected $primaryKey = "id";
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable=[
        'cliente', //foranea de cliente
        'valor', //foranea de variante
        'casa', //foranea de casa
        'material', //foranea de material
        'estado', //estado
        'id_trabajador', //foranea de trabajador
    ];

    public function clientes(){
        return $this->belongsTo(cliente::class, 'cliente', 'id');

    }

    public function valor(){
        return $this->belongsTo(variantes::class, 'valor', 'id');
    }

    public function material(){
        return $this->belongsTo(materiales::class, 'material', 'id');
    }

    public function estado(){
        return $this->belongsTo(estados::class, 'estado', 'id');
    }

    public function trabajo(){
        return $this->belongsTo(trabajadores::class, 'id_trabajador', 'id');
    }

    public function cliente(){
        return $this->hasMany(cliente::class, 'id', 'cod_orden');
    }

    public function casa(){
        return $this->belongsTo(casas::class, 'casa', 'id');
    }
}
