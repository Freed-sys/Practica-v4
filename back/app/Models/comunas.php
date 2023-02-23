<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class comunas extends Model
{
    use HasFactory;
    protected $table = 'comunas';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'nombre_ciudad',
        'cod_region'
    ];

    public function region(){
        return $this->belongsTo(region::class, 'cod_region', 'id');
    }

}
