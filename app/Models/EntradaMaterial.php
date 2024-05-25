<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EntradaMaterial extends Model
{
    protected $table='entrada_material';
    public $timestamps = true;
    protected $fillable = [
        'descripcion',
        'cantidad',
        'fecha',
        'gestion',
        'costo_unitario',
        'costo_total',
        'material_id',
        'user_id',
    ];
}
