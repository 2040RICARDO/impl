<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CargoPersonal extends Model
{
    protected $table='cargo_personal';
    public $timestamps = true;
    protected $fillable = [
        'cargo',
        'descripcion',
        'estado',
    ];
}
