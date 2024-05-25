<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Material;
use App\Models\SalidaMaterial;
use App\Models\Personal;
use Validator;
use Auth;
use App\Http\Controllers\UserController;


class SalidaMaterialController extends Controller
{
    public function index($message=null){
        $personales=Personal::select('personal.*','cargo_personal.cargo','persona.nombre','persona.apellidos')
                            ->join('cargo_personal','cargo_personal.id','=','personal.cargo_id')
                            ->join('persona','persona.id','=','personal.persona_id')
                            ->get();
        $salidaMateriales = SalidaMaterial::select('salida_material.*','material.nombre as nombreMaterial','material.descripcion as material_descripcion','material.control_entrada','material.codigo','categoria_producto.categoria','personal.grado','persona.nombre','persona.apellidos','persona.ci','persona.celular','cargo_personal.cargo')
                                ->join('material','material.id','=','salida_material.material_id')
                                ->join('categoria_producto','categoria_producto.id','=','material.categoriaproducto_id')
                                ->join('personal','personal.id','=','salida_material.personal_id')
                                ->join('cargo_personal','cargo_personal.id','=','personal.cargo_id')
                                ->join('persona','persona.id','=','personal.persona_id')
                                ->orderBy('salida_material.id')
                                ->get();
        $permisos =(new UserController)->userAuth();
     
       return Inertia::render('SalidaMaterial/Index',['salidaMateriales'=>$salidaMateriales,'personales'=>$personales,'message'=>$message,'permisos'=>$permisos]); 
    }



    public function create(){
        $permisos =(new UserController)->userAuth();
        $materiales=Material::orderBy('id')->get();
        $personales=Personal::select('personal.*','cargo_personal.cargo','persona.nombre','persona.apellidos')
                            ->join('cargo_personal','cargo_personal.id','=','personal.cargo_id')
                            ->join('persona','persona.id','=','personal.persona_id')
                            ->get();
        return Inertia::render('SalidaMaterial/Create',['materiales'=>$materiales,'personales'=>$personales,'permisos'=>$permisos]); 
    }

    public function store(Request $request){
            
     
        try{
            $validator = Validator::make($request->all(),[
                'descripcion' => 'required|min:3|max:500',
                'cantidad' => 'required|numeric',
                'materialId' => 'required',
                'personalId' => 'required',
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
            
  
            $salidaMaterial =new SalidaMaterial;

            $salidaMaterial->descripcion = trim($request->descripcion);
            $salidaMaterial->cantidad = trim($request->cantidad);
            $salidaMaterial->fecha = date('Y-m-d');
            $salidaMaterial->gestion = date('Y');
            $salidaMaterial->material_id = $request->materialId;
            $salidaMaterial->personal_id = $request->personalId;
            $salidaMaterial->user_id = Auth::user()->id;
            
            $material = Material::find($request->materialId);
            if($salidaMaterial->cantidad > $material->stock  ){
                return redirect()->back()->with('message','Material no disponible');
            }
            $salidaMaterial->save();
            $material->stock =  $material->stock - $salidaMaterial->cantidad;
            $material->control_entrada = false;
            $material->salida = $material->salida +  intval($salidaMaterial->cantidad);

            
            $material->update();
            return redirect()->route('salidaMaterial.index','Registro realizado con exito!');
        } catch (\Exception $e) {

            return response()->json(['error'=>$e]);
        }
    }









    public function edit($id){
        $permisos =(new UserController)->userAuth();
        $materiales=Material::orderBy('id')->get();
        $personales=Personal::select('personal.*','cargo_personal.cargo','persona.nombre','persona.apellidos')
                            ->join('cargo_personal','cargo_personal.id','=','personal.cargo_id')
                            ->join('persona','persona.id','=','personal.persona_id')
                            ->get();

        $salidaMaterial = SalidaMaterial::select('salida_material.*','material.nombre as nombreMaterial','material.descripcion as material_descripcion','material.control_entrada','material.codigo','categoria_producto.categoria','personal.grado','persona.nombre','persona.apellidos','persona.ci','persona.celular')
                                ->join('material','material.id','=','salida_material.material_id')
                                ->join('categoria_producto','categoria_producto.id','=','material.categoriaproducto_id')
                                ->join('personal','personal.id','=','salida_material.personal_id')
                                ->join('cargo_personal','cargo_personal.id','=','personal.cargo_id')
                                ->join('persona','persona.id','=','personal.persona_id')
                                ->where('salida_material.id',$id)
                                ->first();


        $material=Material::find($salidaMaterial->material_id); 
        $personal=Personal::select('personal.*','cargo_personal.cargo')->join('cargo_personal','cargo_personal.id','=','personal.cargo_id')->find($salidaMaterial->personal_id);                       

        return Inertia::render('SalidaMaterial/Edit',['salidaMaterial'=>$salidaMaterial,'materiales'=>$materiales,'personales'=>$personales,'material'=>$material,'personal'=>$personal,'permisos'=>$permisos]); 
    }

    public function update(Request $request){
         
        try{
            $validator = Validator::make($request->all(),[
                'descripcion' => 'required|min:3|max:500',
                'cantidad' => 'required|numeric',
                'materialId' => 'required',
                'personalId' => 'required',
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
            
  
            $salidaMaterial =SalidaMaterial::find($request->id);

            if($salidaMaterial->material_id == $request->materialId){
                $material = Material::find($salidaMaterial->material_id);
                if($request->cantidad > $material->stock  ){
                    return redirect()->back()->with('message','Material no disponible');
                }
                $material->stock =  $material->stock + intval($salidaMaterial->cantidad);
                $material->salida = $material->salida -  intval($salidaMaterial->cantidad);
                $material->update();
                $material->stock =  $material->stock - intval($request->cantidad);
                $material->salida = $material->salida +  intval($request->cantidad);
                $material->update();
            }else{
                
        
                $material_s = Material::find($request->materialId);

                if($request->cantidad > $material_s->stock  ){
                    return redirect()->back()->with('message','Material no disponible');
                }
                $material_s->stock= $material_s->stock - intval($salidaMaterial->cantidad);
                $material_s->salida = $material_s->salida +  intval($request->cantidad);
                $material_s->update();

                $material_n=Material::find($salidaMaterial->material_id);
             
                $material_n->stock =  $material_n->stock +intval($salidaMaterial->cantidad);
                $material_n->salida = $material_n->salida -  intval($salidaMaterial->cantidad);
                $material_n->update();                
            }

            $salidaMaterial->descripcion = trim($request->descripcion);
            $salidaMaterial->cantidad = trim($request->cantidad);
            $salidaMaterial->material_id = $request->materialId;
            $salidaMaterial->personal_id = $request->personalId;
            $salidaMaterial->update();
            return redirect()->route('salidaMaterial.index','Actualizado con exito!');
        } catch (\Exception $e) {

            return response()->json(['error'=>$e]);
        }
    }
}
