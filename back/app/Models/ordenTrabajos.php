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

    public $fillable=[
        'valor', //foranea de variante
        'casa', //foranea de casa
        'material', //foranea de material
        'estado',
    ];


    public function valor(){
        return $this->belongsTo(variantes::class, 'valor', 'id');
    }

    public function material(){
        return $this->belongsTo(materiales::class, 'material', 'id');
    }
}
