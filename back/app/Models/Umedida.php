<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Umedida extends Model
{
    use HasFactory;
    protected $table = 'umedidas';

    protected $fillable = ['nombre', 'abreviatura'];
}
