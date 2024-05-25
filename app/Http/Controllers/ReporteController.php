<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\CategoriaProducto;
use App\Models\Personal;
use App\Models\Material;
use App\Models\EntradaMaterial;
use App\Models\SalidaMaterial;
use App\Http\Controllers\UserController;

class ReporteController extends Controller
{
    public function categoria($estado){
        $categorias = CategoriaProducto::where(function($query)use($estado){
            if($estado != 4){
                $query->where('estado',$estado);
            }
        })->orderBy('id')->get();

        $pdf = Pdf::loadView('reporte.categoria',compact('categorias'));
        $pdf->set_paper("A4", "portrait");
        return $pdf->stream();
    }



    public function personal($estado){
        $personales = Personal::select('personal.*','persona.nombre','persona.apellidos','persona.ci','persona.direccion','persona.celular','cargo_personal.cargo')
                                        ->where(function($query)use($estado){
                                            if($estado != 4){
                                                $query->where('personal.estado',$estado);
                                            }
                                        })
                                        ->join('persona','persona.id','=','personal.persona_id')
                                        ->join('cargo_personal','cargo_personal.id','=','personal.cargo_id')
                                        ->orderBy('personal.id')
                                        ->get();

        $pdf = Pdf::loadView('reporte.personal',compact('personales'));
        $pdf->set_paper("A4", "portrait");
        return $pdf->stream();
    }



    public function material(){
      
        $materiales = Material::select('material.*','categoria_producto.categoria')
                                ->join('categoria_producto','categoria_producto.id','=','material.categoriaproducto_id')
                                ->orderBy('material.id')
                                ->get();

        $pdf = Pdf::loadView('reporte.material',compact('materiales'));
        $pdf->set_paper("A4", "portrait");
        return $pdf->stream();
    }

    public function entradaMaterial($fecha1,$fecha2){
      
        $entradaMateriales = EntradaMaterial::select('entrada_material.*','material.nombre','material.descripcion as material_descripcion','material.control_entrada','material.codigo','categoria_producto.categoria')
                                                ->join('material','material.id','=','entrada_material.material_id')
                                                ->join('categoria_producto','categoria_producto.id','=','material.categoriaproducto_id')
                                                ->whereBetween('fecha',[$fecha1,$fecha2])
                                                ->orderBy('entrada_material.id')
                                                ->get();

        $pdf = Pdf::loadView('reporte.entradaMaterial',compact('entradaMateriales','fecha1','fecha2'));
        $pdf->set_paper("A4", "portrait");
        return $pdf->stream();
    }

    public function salidaMaterial($fecha1,$fecha2,$personaId){

        $salidaMateriales = SalidaMaterial::select('salida_material.*','material.nombre as nombreMaterial','material.descripcion as material_descripcion','material.control_entrada','material.codigo','categoria_producto.categoria','personal.grado','persona.nombre','persona.apellidos','persona.ci','persona.celular','cargo_personal.cargo')
                                ->join('material','material.id','=','salida_material.material_id')
                                ->join('categoria_producto','categoria_producto.id','=','material.categoriaproducto_id')
                                ->join('personal','personal.id','=','salida_material.personal_id')
                                ->join('cargo_personal','cargo_personal.id','=','personal.cargo_id')
                                ->join('persona','persona.id','=','personal.persona_id')
                                ->whereBetween('salida_material.fecha',[$fecha1,$fecha2])
                                ->where(function($query)use($personaId){
                                    if($personaId != 0){
                                        $query->where('persona_id',$personaId);
                                    }
                                })
                                ->orderBy('salida_material.id')
                                ->get();
      


        $pdf = Pdf::loadView('reporte.salidaMaterial',compact('salidaMateriales','fecha1','fecha2'));
        $pdf->set_paper("A4", "portrait");
        return $pdf->stream();
    }
}
