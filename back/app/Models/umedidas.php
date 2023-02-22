<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class umedidas extends Model
{
    use HasFactory;
    protected $table = 'umedidas';
    protected $primaryKey = "id";
    public $incrementing = true;
    public $timestamps = false;
    

    protected $fillable = ['nombre', 'abreviatura'];
    public function callInventario(){
        return $this->hasMany(Inventarios::class, 'id', 'tipo_mat');
    }
}
