<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class material extends Model
{
    use HasFactory;
    protected $table = 'material';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = false;

    public $fillable = [
        'cod_material',
        'cantidad_material'
    ];


    public function inventario() {
        return $this->belongsTo(inventarios::class, 'cod_material', 'id');  
    }     
    
   
}
