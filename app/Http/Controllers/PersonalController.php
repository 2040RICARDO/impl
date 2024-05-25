<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Personal;
use App\Models\Persona;
use App\Models\CargoPersonal;

use Validator;
use App\Http\Controllers\UserController;

class PersonalController extends Controller
{
    public function index($message=null){
        $personal = Personal::select('personal.*','persona.nombre','persona.apellidos','persona.ci','persona.direccion','persona.celular','cargo_personal.cargo')
                                ->join('persona','persona.id','=','personal.persona_id')
                                ->join('cargo_personal','cargo_personal.id','=','personal.cargo_id')
                                ->get();
        $permisos =(new UserController)->userAuth();
        return Inertia::render('Personal/Index',['personal'=>$personal,'message'=>$message,'permisos'=>$permisos]); 
    }

    public function create(){
        $cargos=CargoPersonal::select('id','cargo')->where('estado',true)->get();
        $permisos =(new UserController)->userAuth();
        return Inertia::render('Personal/Create',['cargos'=>$cargos,'permisos'=>$permisos]); 
    }

    public function store(Request $request){
        try{
            
            $validator = Validator::make($request->all(),[
                'nombre' => 'required|min:3|max:255',
                'apellidos' => 'required|min:3|max:255',
                'ci' => 'required|min:3|max:255',
                'ci' => 'required|numeric',
                'direccion' => 'required',
                'observacion' => 'required',
                'estado' => 'required',
                'grado' => 'required',
                'cargoId' => 'required',
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
           
            
            $persona=new Persona;
            $persona->nombre = trim(strtoupper($request->nombre));
            $persona->apellidos = trim(strtoupper( $request->apellidos));
            $persona->ci = trim(strtoupper($request->ci));
            $persona->direccion =  trim(strtoupper($request->direccion));
            $persona->celular = trim(strtoupper($request->celular));
            $persona->save();

            $personal=new Personal;
            $personal->observacion=$request->observacion;
            $personal->grado = $request->grado;
            $personal->cargo_id=$request->cargoId;
            $personal->persona_id=$persona->id;
            $personal->save();

            return redirect()->route('personal.index','Registro realizado con exito!');

        } catch (\Exception $e) {
            return response()->json(['error'=>$e]);
        }

    }

    public function edit($id){
        $cargos=CargoPersonal::select('id','cargo')->where('estado',true)->get();
        $personal = Personal::select('personal.*','persona.nombre','persona.apellidos','persona.ci','persona.direccion','persona.celular')
                                ->join('persona','persona.id','=','personal.persona_id')
                                ->join('cargo_personal','cargo_personal.id','=','personal.cargo_id')
                                ->where('personal.id',$id)
                                ->first();
        $permisos =(new UserController)->userAuth();                      
        return Inertia::render('Personal/Edit',['personal'=>$personal,'cargos'=>$cargos,'permisos'=>$permisos]); 
    }

    public function update(Request $request){
        try{
            $personal=Personal::find($request->id);

            $persona=Persona::find($personal->persona_id);
         
            $validator = Validator::make($request->all(),[
                'nombre' => 'required|min:3|max:255',
                'apellidos' => 'required|min:3|max:255',
                'direccion' => 'required',
                'observacion' => 'required',
                'estado' => 'required',
                'grado' => 'required',
                'cargoId' => 'required',
                'ci' => 'unique:persona,ci,' . $persona->id,
            ]);
         
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
               
            $persona->nombre = trim(strtoupper($request->nombre));
            $persona->apellidos = trim(strtoupper( $request->apellidos));
            $persona->ci = trim(strtoupper($request->ci));
            $persona->direccion =  trim(strtoupper($request->direccion));
            $persona->celular = trim(strtoupper($request->celular));
            $persona->update();

            $personal->observacion=$request->observacion;
            $personal->grado = $request->grado;
            $personal->cargo_id=$request->cargoId;
            $personal->persona_id=$persona->id;
            $personal->update();
    
        
            return redirect()->route('personal.index','Actualizado con exito!');

        } catch (\Exception $e) {
            return response()->json(['error'=>$e]);
        }
    }
}
