<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

use Validator;


use App\Models\Permission;
use App\Models\Role;
use Inertia\Inertia;
use DB;
use App\Http\Controllers\UserController;

class RoleController extends Controller
{
    public function index($message=null){
        $roles = Role::all();
        $permisos =(new UserController)->userAuth();

       return Inertia::render('Role/Index',['roles'=>$roles,'message'=>$message,'permisos'=>$permisos]); 
    }
    public function create(){
        $permisos =(new UserController)->userAuth();
        $permissions=Permission::orderBy('id')->get();
      
        return Inertia::render('Role/Create',['permissions'=>$permissions,'permisos'=>$permisos]); 
    }

    public function store(Request $request){
        try{
            $validator = Validator::make($request->all(),[
                'name' => 'required|min:3|max:500',
                'descripcion' => 'required|min:3|max:500',
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
    
            if(count($request->permisos) == 0){
                return redirect()->back()->with('message','Seleccione Permisos');
            }
            $role =new Role;
            $role->name=$request->name;
            $role->description =$request->descripcion;
            $role->save();
            $role->syncPermissions($request->permisos);

            return redirect()->route('role.index','Registro realizado con exito!');
        } catch (\Exception $e) {
            return response()->json(['error'=>$e]);
        }
    }


    public function edit($id){
        $permisos =(new UserController)->userAuth();
        $role = Role::find($id);
        $permisosss = DB::table('permission_role')
        ->select('permissions.name')
        ->join('permissions', 'permission_role.permission_id', '=', 'permissions.id')
        ->where('permission_role.role_id',  $role->id)
        ->pluck('permissions.name')->toArray();

        $permissions=Permission::orderBy('id')->get();

        return Inertia::render('Role/Edit',['role'=>$role,'permisosss'=>$permisosss,'permissions'=>$permissions,'permisos'=>$permisos]); 
    }


    public function update(Request $request){
        try{
            $validator = Validator::make($request->all(),[
                'name' => 'required|min:3|max:500',
                'descripcion' => 'required|min:3|max:500',
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
    
            if(count($request->permisos) == 0){
                return redirect()->back()->with('message','Seleccione Permisos');
            }

            $role =Role::find($request->id);
            $role->name=$request->name;
            $role->description =$request->descripcion;
            $role->update();
            $role->syncPermissions($request->permisos);

            return redirect()->route('role.index','Actualizado con exito!');
        } catch (\Exception $e) {
            return response()->json(['error'=>$e]);
        }
    }
}
