<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personal extends Model
{
    protected $table='personal';
    public $timestamps = true;
    protected $fillable = [
        'observacion',
        'grado',
        'estado',
        'cargo_id',
        'persona_id',
    ];
}
