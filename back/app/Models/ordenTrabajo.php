<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ordenTrabajo extends Model
{
    use HasFactory;
    protected $table = 'ordenTrabajo';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = false;
    protected $fillable = [
        'valor',
        'tipo_casa',
        'material'
    ];

   public function cliente(){
    return $this->hasMany(clientes::class, 'id','codigo_orden');
   } 
   public function variante(){
    return $this->belongsTo(variantes::class, 'id','tipo_casa');
   } 
}
