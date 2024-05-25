<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoriaProducto extends Model
{
    protected $table='categoria_producto';
    public $timestamps = true;
    protected $fillable = [
        'categoria',
        'descripcion',
        'estado',
    ];

}
