<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class estados extends Model
{
    use HasFactory;
    protected $table = 'estados';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = false;
    protected $fillable = [
        'name'
    ];

    public function orden(){
        return $this->hasOne(ordenTrabajos::class, 'id', 'estado');
    }
}
