<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class casas extends Model
{
    use HasFactory;
    protected $table = 'casas';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = false;
    protected $fillable = [
        'desc_casa',
        'tipo', //foranea de variante
        'observaciones'
    ];

    public function variante(){
        return $this->belongsTo(variantes::class, 'tipo', 'id');
    }


    public function ordenTrabajo(){
        return $this->hasMany(casas::class, 'id', 'casa');
    }
}
