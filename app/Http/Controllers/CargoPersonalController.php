<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\CargoPersonal;
use Validator;
use App\Http\Controllers\UserController;

class CargoPersonalController extends Controller
{
    public function index($message=null){
        $cargos = CargoPersonal::all();
        $permisos =(new UserController)->userAuth();
       return Inertia::render('CargoPersonal/Index',['cargos'=>$cargos,'message'=>$message,'permisos'=>$permisos]); 
    }

    public function create(){
        $permisos =(new UserController)->userAuth();
        return Inertia::render('CargoPersonal/Create',['permisos'=>$permisos]); 
    }

    public function store(Request $request){
        try{
          
            $validator = Validator::make($request->all(),[
                'cargo' => 'required|min:3|max:255',
                'descripcion' => 'required|min:3|max:500',
                'estado' => 'required',
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }

            $data = [
                'cargo' => trim(strtoupper($request->cargo)),
                'descripcion' => trim($request->descripcion),
                'estado' => $request->estado,
            ];
        
            CargoPersonal::create($data);
            return redirect()->route('cargoPersonal.index','Registro realizado con exito!');

        } catch (\Exception $e) {
            return response()->json(['error'=>$e]);
        }

    }

    public function edit($id){
        $permisos =(new UserController)->userAuth();
        $cargoPersonal=CargoPersonal::find($id);
        return Inertia::render('CargoPersonal/Edit',['cargoPersonal'=>$cargoPersonal,'permisos'=>$permisos]); 
    }

    public function update(Request $request){
        try{
          
            $validator = Validator::make($request->all(),[
                'cargo' => 'required|min:3|max:500',
                'descripcion' => 'required|min:3|max:500',
                'estado' => 'required',
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
            $cargo =CargoPersonal::find($request->id);
            $cargo->cargo= trim(strtoupper($request->cargo));
            $cargo->descripcion =  trim($request->descripcion);
            $cargo->estado = $request->estado;
            $cargo->update();
            return redirect()->route('cargoPersonal.index','Actualizado con exito!');

        } catch (\Exception $e) {
            return response()->json(['error'=>$e]);
        }
    }
}
