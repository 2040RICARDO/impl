<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\CategoriaProducto;
use App\Models\User;

use Validator;


use App\Models\Permission;
use App\Models\Role;
use Auth;
use App\Http\Controllers\UserController;


class CategoriaProductoController extends Controller
{
    public function index($message=null){

        
        /* $createPost = Permission::create([
            'name' => 'ver-categoria',
            'display_name' => 'Categoria Producto', 
            'description' => 'Ver lista de Categoria de Producto', 
        ]);
        $createPost = Permission::create([
            'name' => 'crear-categoria',
            'display_name' => 'Categoria Producto', 
            'description' => 'Registrar Categoria', 
        ]);

        $createPost = Permission::create([
            'name' => 'editar-categoria',
            'display_name' => 'Categoria Producto', 
            'description' => 'Editar Categoria', 
        ]);
        $createPost = Permission::create([
            'name' => 'reporte-categoria',
            'display_name' => 'Categoria Producto', 
            'description' => 'Reporte Categoria', 
        ]);

    
        $createPost = Permission::create([
            'name' => 'ver-cargo',
            'display_name' => 'Cargo Personal', 
            'description' => 'Ver lista de Cargo de Personal', 
        ]);
        $createPost = Permission::create([
            'name' => 'crear-cargo',
            'display_name' => 'Cargo Personal', 
            'description' => 'Registrar Cargo de Personal', 
        ]);

        $createPost = Permission::create([
            'name' => 'editar-cargo',
            'display_name' => 'Cargo Personal', 
            'description' => 'Editar Cargo de Personal', 
        ]);
        $createPost = Permission::create([
            'name' => 'reporte-cargo',
            'display_name' => 'Cargo Personal', 
            'description' => 'Reporte Cargo de Personal', 
        ]);


        $createPost = Permission::create([
            'name' => 'ver-personal',
            'display_name' => 'Personal', 
            'description' => 'Ver lista de Personal', 
        ]);
        $createPost = Permission::create([
            'name' => 'crear-personal',
            'display_name' => 'Personal', 
            'description' => 'Registrar Personal', 
        ]);

        $createPost = Permission::create([
            'name' => 'editar-personal',
            'display_name' => 'Personal', 
            'description' => 'Editar Personal', 
        ]);
        $createPost = Permission::create([
            'name' => 'reporte-personal',
            'display_name' => 'Personal', 
            'description' => 'Reporte Personal', 
        ]);

        
        $createPost = Permission::create([
            'name' => 'ver-material',
            'display_name' => 'Material', 
            'description' => 'Ver lista de Material', 
        ]);
        $createPost = Permission::create([
            'name' => 'crear-material',
            'display_name' => 'Material', 
            'description' => 'Registrar Material', 
        ]);

        $createPost = Permission::create([
            'name' => 'editar-material',
            'display_name' => 'Material', 
            'description' => 'Editar Material', 
        ]);
        $createPost = Permission::create([
            'name' => 'reporte-material',
            'display_name' => 'Material', 
            'description' => 'Reporte Material', 
        ]);

       
        $createPost = Permission::create([
            'name' => 'ver-entradas',
            'display_name' => 'Entrada de Material', 
            'description' => 'Ver lista de Entradas de Material', 
        ]);
        $createPost = Permission::create([
            'name' => 'crear-entradas',
            'display_name' => 'Entrada de Material', 
            'description' => 'Registrar Entradas de Material', 
        ]);

        $createPost = Permission::create([
            'name' => 'editar-entradas',
            'display_name' => 'Entrada de Material', 
            'description' => 'Editar Entradas de Material', 
        ]);
        $createPost = Permission::create([
            'name' => 'reporte-entradas',
            'display_name' => 'Entrada de Material', 
            'description' => 'Reporte Entradas de Material', 
        ]);

        $createPost = Permission::create([
            'name' => 'ver-salidas',
            'display_name' => 'Salida de Material', 
            'description' => 'Ver lista de Salida de Material', 
        ]);
        $createPost = Permission::create([
            'name' => 'crear-salidas',
            'display_name' => 'Salida de Material', 
            'description' => 'Registrar Salida de Material', 
        ]);

        $createPost = Permission::create([
            'name' => 'editar-salidas',
            'display_name' => 'Salida de Material', 
            'description' => 'Editar Salida de Material', 
        ]);
        $createPost = Permission::create([
            'name' => 'reporte-salidas',
            'display_name' => 'Salida de Material', 
            'description' => 'Reporte Salida de Material', 
        ]);


'ver-categoria','crear-categoria','editar-categoria','reporte-categoria','ver-cargo','crear-cargo','editar-cargo','reporte-cargo','ver-personal','crear-personal','editar-personal','reporte-personal','ver-material','crear-material','editar-material','reporte-material','ver-entradas','crear-entradas','editar-entradas','reporte-entradas','ver-salidas','crear-salidas','editar-salidas','reporte-salidas'

 */
        /* $createPost = Permission::create([
            'name' => 'crear-categoria',
            'display_name' => 'Crear Categoria', 
            'description' => 'Crear Categoria', 

        ]);
        $admin = Role::create([
            'name' => 'admin',
            'display_name' => 'User Administrador', // optional
            'description' => 'El usuario puede administrar y editar otros usuarios.', // optional
        ]); */
        //asignar permisos al rol
       /*  $role = Role::where('name', 'admin')->first();
        $permissions = ['crear-categoria'];
        $role->syncPermissions($permissions);
        dd('kjj');
        dd('si'); */

        //asignar rol al usuario
        /* $user = User::find(1);
        $role = Role::where('name', 'admin')->first(); 
        $user->addRole($role);
        dd('si'); */

        $permisos =(new UserController)->userAuth();
        $categorias = CategoriaProducto::all();
        
       return Inertia::render('CategoriaProducto/Index',['categorias'=>$categorias,'message'=>$message,'permisos'=>$permisos]); 
    }

    public function create(){
        $permisos =(new UserController)->userAuth();
        return Inertia::render('CategoriaProducto/Create',['permisos'=>$permisos]); 
    }

    public function store(Request $request){
        try{
           
          
            $validator = Validator::make($request->all(),[
                'categoria' => 'required|min:3|max:500',
                'descripcion' => 'required|min:3|max:500',
                'estado' => 'required',
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }

            $data = [
                'categoria' => trim(strtoupper($request->categoria)),
                'descripcion' => trim($request->descripcion),
                'estado' => $request->estado,
            ];
        
            CategoriaProducto::create($data);
            return redirect()->route('categoriaProducto.index','Registro realizado con exito!');

        } catch (\Exception $e) {
            return response()->json(['error'=>$e]);
        }

    }

    public function edit($id){
        $permisos =(new UserController)->userAuth();
        $categoriaProducto=CategoriaProducto::find($id);
        return Inertia::render('CategoriaProducto/Edit',['categoriaProducto'=>$categoriaProducto,'permisos'=>$permisos]); 
    }

    public function update(Request $request){
        try{
          
            $validator = Validator::make($request->all(),[
                'categoria' => 'required|min:3|max:500',
                'descripcion' => 'required|min:3|max:500',
                'estado' => 'required',
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }

            $categoria =CategoriaProducto::find($request->id);
            $categoria->categoria= trim(strtoupper($request->categoria));
            $categoria->descripcion =  trim($request->descripcion);
            $categoria->estado = $request->estado;
            $categoria->update();

            return redirect()->route('categoriaProducto.index','Actualizado con exito!');

        } catch (\Exception $e) {
            return response()->json(['error'=>$e]);
        }
    }
}
