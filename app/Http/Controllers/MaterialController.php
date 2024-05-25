<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;
use App\Models\Material;
use App\Models\CategoriaProducto;
use Validator;
use App\Http\Controllers\UserController;

class MaterialController extends Controller
{
    public function index($message=null){

        $materiales = Material::select('material.*','categoria_producto.categoria')
                                ->join('categoria_producto','categoria_producto.id','=','material.categoriaproducto_id')
                                ->orderBy('material.id')
                                ->get();
        $permisos =(new UserController)->userAuth();
       return Inertia::render('Material/Index',['materiales'=>$materiales,'message'=>$message,'permisos'=>$permisos]); 
    }

    public function create(){
        $permisos =(new UserController)->userAuth();
        $categorias=CategoriaProducto::select('id','categoria')->where('estado',true)->get();
        return Inertia::render('Material/Create',['categorias'=>$categorias,'permisos'=>$permisos]); 
    }

    public function store(Request $request){
        try{

          
            $validator = Validator::make($request->all(),[
                'nombre' => 'required|min:3|max:500',
                'descripcion' => 'required|min:3|max:500',
                'unidad' => 'required',
                'categoriaId' => 'required',
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }

            $material =new Material;
            $material->nombre = trim(strtoupper($request->nombre));
            $material->descripcion = trim($request->descripcion);
            $material->unidad = trim($request->unidad);
            $material->categoriaproducto_id =$request->categoriaId;
            $material->save();
            $material->codigo ='IMP-'.$material->id;
            $material->update();
            return redirect()->route('material.index','Registro realizado con exito!');
        } catch (\Exception $e) {
            return response()->json(['error'=>$e]);
        }
    }









    public function edit($id){
        $permisos =(new UserController)->userAuth();
        $categorias=CategoriaProducto::select('id','categoria')->where('estado',true)->get();
        $material = Material::select('material.*','categoria_producto.categoria')
                                ->join('categoria_producto','categoria_producto.id','=','material.categoriaproducto_id')
                                ->where('material.id',$id)
                                ->first();
        return Inertia::render('Material/Edit',['categorias'=>$categorias,'material'=>$material,'permisos'=>$permisos]); 
    }

    public function update(Request $request){
        try{
          
            $validator = Validator::make($request->all(),[
                'nombre' => 'required|min:3|max:500',
                'descripcion' => 'required|min:3|max:500',
                'unidad' => 'required',
                'categoriaId' => 'required',
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }

            $material =Material::find($request->id);
            $material->nombre = trim(strtoupper($request->nombre));
            $material->descripcion = trim($request->descripcion);
            $material->unidad = trim($request->unidad);
            $material->categoriaproducto_id =$request->categoriaId;
            $material->update();

            return redirect()->route('material.index','Actualizado con exito!');
        } catch (\Exception $e) {
            return response()->json(['error'=>$e]);
        }
    }
}
