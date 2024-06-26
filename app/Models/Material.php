<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    protected $table='material';
    public $timestamps = true;
    protected $fillable = [
        'nombre',
        'codigo',
        'descripcion',
        'stock',
        'unidad',
        'cantidad_disponible',
        'salida',
        'entrada',
    ];
}
