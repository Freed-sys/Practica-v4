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
        'variante', //foranea de inventarios
        'estado', //estado
        'observaciones', //observacion

    ];

    public function clientes(){
        return $this->belongsTo(cliente::class, 'cliente', 'id');

    }

    public function valor(){
        return $this->belongsTo(variantes::class, 'variante', 'id');
    }


    public function estado(){
        return $this->belongsTo(estados::class, 'estado', 'id');
    }



}
