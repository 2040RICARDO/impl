<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Persona;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Decrypt;
use App\Models\Role;
use DB;


class UserController extends Controller
{
    public function index($message=null){

        $users=User::select('users.*','persona.nombre','persona.apellidos',)
                        ->join('persona','persona.id','=','users.persona_id')
                        ->orderBy('id')
                        ->get();

        foreach($users as $value){
            $role = DB::table('role_user')
                        ->where('user_id',  $value->id)
                        ->first();
             
            if($role != null){
                $rol=Role::find($role->role_id);
                $value->role=$rol->name;
            }else{
                $value->role=null;
            }
            $contrasena=decrypt($value->cp);
            $value->contrasena = $contrasena;
        }  
       
        $permisos =$this->userAuth();
    
        return Inertia::render('User/Index',['users'=>$users,'message'=>$message,'permisos'=>$permisos]);
    }


    public function create()
    {
        $permisos =$this->userAuth();
        $roles=Role::orderBy('id')->get();
        return Inertia::render('User/Create',['roles'=>$roles,'permisos'=>$permisos]);
    }


    public function store(Request $request)
    {
     
        $request->validate([
            'apellidos' => 'required|max:255',
            'nombre' => 'required|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'roleId'=>'required'
        ]);
        $persona=new Persona;
        $persona->nombre =$request->nombre;
        $persona->apellidos =$request->apellidos;
        $persona->save();
       
        $user = User::create([
            'name' => $persona->nombre,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));
        
        
        $u=User::find($user->id);
        
        $u->persona_id=$persona->id;
        $u->cp=Crypt::encrypt($request->password);
        $u->update();


        $role = Role::find($request->roleId);
        $u->addRole($role);

        return redirect()->route('userss.index','Registro realizado con exito!');

        //return redirect()->route('dashboard');
    }

    public function edit($id){
        $permisos =$this->userAuth();
        $user=User::find($id);
        $roles=Role::orderBy('id')->get();

        $role = DB::table('role_user')
                        
                        ->where('user_id',  $user->id)
                        ->first();
                       
            

        return Inertia::render('User/Edit',['user'=>$user,'roles'=>$roles,'role'=>$role,'permisos'=>$permisos]); 
        
    }

    public function update(Request $request){

        $user=User::find($request->id);
        
        
        $roleDelete=Role::find($request->roleIdP);
  
        if($roleDelete != null){
            $user->removeRole($roleDelete); 
        }
    
        $roleAdd=Role::find($request->roleId);
        $user->addRole($roleAdd);

        return redirect()->route('userss.index','Rol de Usuario actualizado con exito!');

    }


    public function userAuth(){
        $user = User::find(Auth::user()->id);
        $permisos = json_decode($user->allPermissions());

        return $permisos;
    }
}
