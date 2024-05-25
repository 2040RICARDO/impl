<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CategoriaProductoController;
use App\Http\Controllers\CargoPersonalController;
use App\Http\Controllers\PersonalController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\EntradaMaterialController;
use App\Http\Controllers\SalidaMaterialController;
use App\Http\Controllers\ReporteController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;


Route::get('/', function () {
  
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $permisos =(new UserController)->userAuth();
    return Inertia::render('Dashboard',['permisos'=>$permisos]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    /////////////////CATEGORIA////////////////////////////
    Route::middleware(['auth', 'permission:ver-categoria'])->group(function () {
        Route::get('categoriaProducto/index/{message?}',[CategoriaProductoController::class, 'index'])->name('categoriaProducto.index');
    });
    
    Route::middleware(['auth', 'permission:crear-categoria'])->group(function () {
        Route::get('categoriaProducto/create',[CategoriaProductoController::class, 'create'])->name('categoriaProducto.create');
        Route::post('categoriaProducto/store',[CategoriaProductoController::class, 'store'])->name('categoriaProducto.store');

    });
    Route::middleware(['auth', 'permission:editar-categoria'])->group(function () {
        Route::get('categoriaProducto/edit/{id}',[CategoriaProductoController::class, 'edit']);
        Route::put('categoriaProducto/update',[CategoriaProductoController::class, 'update'])->name('categoriaProducto.update');
    });
    
    /////////////////CATEGORIA/////////////////////////////////



    /////////////////CARGO PERSONAL////////////////////////////
    
    Route::middleware(['auth', 'permission:ver-cargo'])->group(function () {
        Route::get('cargoPersonal/index/{message?}',[CargoPersonalController::class, 'index'])->name('cargoPersonal.index');
    });
    Route::middleware(['auth', 'permission:crear-cargo'])->group(function () {
        Route::get('cargoPersonal/create',[CargoPersonalController::class, 'create'])->name('cargoPersonal.create');
        Route::post('cargoPersonal/store',[CargoPersonalController::class, 'store'])->name('cargoPersonal.store');
    });
    Route::middleware(['auth', 'permission:editar-cargo'])->group(function () {
        Route::get('cargoPersonal/edit/{id}',[CargoPersonalController::class, 'edit']);
        Route::put('cargoPersonal/update',[CargoPersonalController::class, 'update'])->name('cargoPersonal.update');
    });
    
    /////////////////CARGO PERSONAL/////////////////////////////////



    /////////////////PERSONAL////////////////////////////
    Route::middleware(['auth', 'permission:ver-personal'])->group(function () {
        Route::get('personal/index/{message?}',[PersonalController::class, 'index'])->name('personal.index');
    });
    Route::middleware(['auth', 'permission:crear-personal'])->group(function () {
        Route::get('personal/create',[PersonalController::class, 'create'])->name('personal.create');
        Route::post('personal/store',[PersonalController::class, 'store'])->name('personal.store');
    });
    Route::middleware(['auth', 'permission:editar-personal'])->group(function () {
        Route::get('personal/edit/{id}',[PersonalController::class, 'edit']);
        Route::put('personal/update',[PersonalController::class, 'update'])->name('personal.update');
    });
    
    
    /////////////////PERSONAL/////////////////////////////////


    /////////////////MATERIAL////////////////////////////
    Route::middleware(['auth', 'permission:ver-material'])->group(function () {
        Route::get('material/index/{message?}',[MaterialController::class, 'index'])->name('material.index');
    });
    Route::middleware(['auth', 'permission:crear-material'])->group(function () {
        Route::get('material/create',[MaterialController::class, 'create'])->name('material.create');
        Route::post('material/store',[MaterialController::class, 'store'])->name('material.store');
    });
    Route::middleware(['auth', 'permission:editar-material'])->group(function () {
        Route::get('material/edit/{id}',[MaterialController::class, 'edit']);
        Route::put('material/update',[MaterialController::class, 'update'])->name('material.update');
    });
    /////////////////MATERIAL/////////////////////////////////

    /////////////////ENTRADA MATERIAL////////////////////////////
    Route::middleware(['auth', 'permission:ver-entrada'])->group(function () {
        Route::get('entradaMaterial/index/{message?}',[EntradaMaterialController::class, 'index'])->name('entradaMaterial.index');
    });
    Route::middleware(['auth', 'permission:crear-entrada'])->group(function () {
        Route::get('entradaMaterial/create',[EntradaMaterialController::class, 'create'])->name('entradaMaterial.create');
        Route::post('entradaMaterial/store',[EntradaMaterialController::class, 'store'])->name('entradaMaterial.store');
    });
    Route::middleware(['auth', 'permission:editar-entrada'])->group(function () {
        Route::get('entradaMaterial/edit/{id}',[EntradaMaterialController::class, 'edit']);
        Route::put('entradaMaterial/update',[EntradaMaterialController::class, 'update'])->name('entradaMaterial.update');
    });
    /////////////////ENTRADA MATERIAL/////////////////////////////////


    /////////////////ENTRADA MATERIAL////////////////////////////
    Route::middleware(['auth', 'permission:ver-salida'])->group(function () {
        Route::get('salidaMaterial/index/{message?}',[SalidaMaterialController::class, 'index'])->name('salidaMaterial.index');
    });
    Route::middleware(['auth', 'permission:crear-salida'])->group(function () {
        Route::get('salidaMaterial/create',[SalidaMaterialController::class, 'create'])->name('salidaMaterial.create');
        Route::post('salidaMaterial/store',[SalidaMaterialController::class, 'store'])->name('salidaMaterial.store');
    });
    Route::middleware(['auth', 'permission:editar-salida'])->group(function () {
        Route::get('salidaMaterial/edit/{id}',[SalidaMaterialController::class, 'edit']);
        Route::put('salidaMaterial/update',[SalidaMaterialController::class, 'update'])->name('salidaMaterial.update');
    });
    
    
    
    /////////////////ENTRADA MATERIAL/////////////////////////////////

    /////////////////ROLES////////////////////////////
    Route::middleware(['auth', 'permission:ver-roles'])->group(function () {
        Route::get('role/index/{message?}',[RoleController::class, 'index'])->name('role.index');
    });
    Route::middleware(['auth', 'permission:crear-roles'])->group(function () {
        Route::get('role/create',[RoleController::class, 'create'])->name('role.create');
        Route::post('role/store',[RoleController::class, 'store'])->name('role.store');
    });
    Route::middleware(['auth', 'permission:editar-roles'])->group(function () {
        Route::get('role/edit/{id}',[RoleController::class, 'edit']);
        Route::put('role/update',[RoleController::class, 'update'])->name('role.update');
    });
    /////////////////ROLES/////////////////////////////////



    ///////////////////////7USUARIOS //////////////////////////////////////

    /////////////////User////////////
    Route::middleware(['auth', 'permission:ver-usuario'])->group(function () {
        Route::get('users/index/{message?}', [UserController::class, 'index'])->name('userss.index');
    });
    Route::middleware(['auth', 'permission:crear-usuario'])->group(function () {
        Route::get('users/create', [UserController::class, 'create'])->name('userss.create');
        Route::post('users/store', [UserController::class, 'store'])->name('userss.store');
    });
    Route::middleware(['auth', 'permission:editar-usuario'])->group(function () {
        Route::get('userss/edit/{id}',[UserController::class, 'edit']);
        Route::put('userss/update',[UserController::class, 'update'])->name('userss.update');
    });
    /////////////////User////////////   

    /////////////////////USUARIOS//////////////////////////////////77 


    /////////////////REPORTE/////////////////////////////////
    Route::middleware(['auth', 'permission:reporte-categoria'])->group(function () {
        Route::get('reporte/categoria/{estado}', [ReporteController::class, 'categoria']);
    });
    Route::middleware(['auth', 'permission:reporte-personal'])->group(function () {
        Route::get('reporte/personal/{estado}', [ReporteController::class, 'personal']);
    });
    Route::middleware(['auth', 'permission:reporte-material'])->group(function () {
        Route::get('reporte/material', [ReporteController::class, 'material']);
    });
    Route::middleware(['auth', 'permission:reporte-entrada'])->group(function () {
        Route::get('reporte/entradaMaterial/{fecha1}/{fecha2}', [ReporteController::class, 'entradaMaterial']);
    });
    Route::middleware(['auth', 'permission:reporte-salida'])->group(function () {
        Route::get('reporte/salidaMaterial/{fecha1}/{fecha2}/{personaId}', [ReporteController::class, 'salidaMaterial']);
    });
    /////////////////REPORTE/////////////////////////////////

});

require __DIR__.'/auth.php';
