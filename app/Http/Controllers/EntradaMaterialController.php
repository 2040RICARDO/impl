<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Material;
use App\Models\EntradaMaterial;
use Validator;
use Auth;
use App\Http\Controllers\UserController;

class EntradaMaterialController extends Controller
{
    public function index($message=null){

        $entradaMateriales = EntradaMaterial::select('entrada_material.*','material.nombre','material.descripcion as material_descripcion','material.control_entrada','material.codigo','categoria_producto.categoria')
                                ->join('material','material.id','=','entrada_material.material_id')
                                ->join('categoria_producto','categoria_producto.id','=','material.categoriaproducto_id')
                                ->orderBy('entrada_material.id')
                                ->get();
        $permisos =(new UserController)->userAuth();
     
       return Inertia::render('EntradaMaterial/Index',['entradaMateriales'=>$entradaMateriales,'message'=>$message,'permisos'=>$permisos]); 
    }



    public function create(){
        $permisos =(new UserController)->userAuth();
        $materiales=Material::all();
        return Inertia::render('EntradaMaterial/Create',['materiales'=>$materiales,'permisos'=>$permisos]); 
    }

    public function store(Request $request){
        try{
            $validator = Validator::make($request->all(),[
                'descripcion' => 'required|min:3|max:500',
                'cantidad' => 'required|numeric',
                'costo_unitario' => 'required',
                'materialId' => 'required',
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
            
  
            $entradaMaterial =new EntradaMaterial;
            $entradaMaterial->descripcion = trim($request->descripcion);
            $entradaMaterial->cantidad = trim($request->cantidad);
            $entradaMaterial->fecha = date('Y-m-d');
            $entradaMaterial->gestion = date('Y');
            $entradaMaterial->costo_unitario =floatval(str_replace(',', '.', $request->costo_unitario));
            $costo_total= trim($request->cantidad) * $entradaMaterial->costo_unitario;
            $entradaMaterial->costo_total=$costo_total;
            $entradaMaterial->material_id = $request->materialId;
            $entradaMaterial->user_id = Auth::user()->id;
            $entradaMaterial->save();
            
            $material = Material::find($request->materialId);
            $material->stock =  $material->stock + $entradaMaterial->cantidad;
            $material->control_entrada = true;
            $material->entrada = $material->entrada + $entradaMaterial->cantidad;
            $material->update();

            return redirect()->route('entradaMaterial.index','Registro realizado con exito!');
        } catch (\Exception $e) {

            return response()->json(['error'=>$e]);
        }
    }









    public function edit($id){
        $permisos =(new UserController)->userAuth();
        $materiales=Material::all();

 
        $entradaMaterial = EntradaMaterial::select('entrada_material.*','material.nombre','material.descripcion as material_descripcion','material.control_entrada','material.codigo','categoria_producto.categoria')
                                ->join('material','material.id','=','entrada_material.material_id')
                                ->join('categoria_producto','categoria_producto.id','=','material.categoriaproducto_id')
                                ->where('entrada_material.id',$id)
                                ->first();
        $material=Material::find($entradaMaterial->material_id);                        

        return Inertia::render('EntradaMaterial/Edit',['entradaMaterial'=>$entradaMaterial,'materiales'=>$materiales,'material'=>$material,'permisos'=>$permisos]); 
    }

    public function update(Request $request){
        try{
          
            
            $validator = Validator::make($request->all(),[
                'descripcion' => 'required|min:3|max:500',
                'cantidad' => 'required|numeric',
                'costo_unitario' => 'required',
                'materialId' => 'required',
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
            
            $entradaMaterial =EntradaMaterial::find($request->id);
            $material = Material::find($entradaMaterial->material_id);
            $material->stock= $material->stock - $entradaMaterial->cantidad;
            $material->entrada= $material->entrada - $entradaMaterial->cantidad;
            $material->update();

            $entradaMaterial->descripcion = trim($request->descripcion);
            $entradaMaterial->cantidad = trim($request->cantidad);

            $entradaMaterial->costo_unitario =floatval(str_replace(',', '.', $request->costo_unitario));
            $costo_total= trim($request->cantidad) * $entradaMaterial->costo_unitario;
            $entradaMaterial->costo_total=$costo_total;
            $entradaMaterial->material_id = $request->materialId;
            $entradaMaterial->update();
            
            
            $material_e = Material::find($request->materialId);
            $material_e->stock =  $material_e->stock + $entradaMaterial->cantidad;
            $material_e->control_entrada = true;
            $material_e->entrada = $material_e->entrada + $entradaMaterial->cantidad;
            $material_e->update();

            return redirect()->route('entradaMaterial.index','Actualizado con exito!');

        } catch (\Exception $e) {
            return response()->json(['error'=>$e]);
        }
    }
}
