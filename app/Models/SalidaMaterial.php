<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalidaMaterial extends Model
{
    protected $table='salida_material';
    public $timestamps = true;
    protected $fillable = [
        'descripcion',
        'cantidad',
        'fecha',
        'gestion',
        'personal_id',
        'material_id',
        'user_id',
    ];
}
