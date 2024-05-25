import React, { useContext } from 'react';
import Menuitem from './Menuitem';
import { MenuProvider } from './menucontext';

const AppMenu = ({permisos}) => {
  
    const verCategoria = permisos.some(permiso => permiso.name === 'ver-categoria');
    const verRoles= permisos.some(permiso => permiso.name === 'ver-roles');
    const verCargo= permisos.some(permiso => permiso.name === 'ver-cargo');
    const verPersonal = permisos.some(permiso => permiso.name === 'ver-personal');
    const verMaterial = permisos.some(permiso => permiso.name === 'ver-material');
    const verEntrada = permisos.some(permiso => permiso.name === 'ver-entrada');
    const verSalida = permisos.some(permiso => permiso.name === 'ver-salida');
    const verUsuario = permisos.some(permiso => permiso.name === 'ver-usuario');

    const model = [
        {
            label: 'PRINCIPAL',
            items: [
                { label: 'Home', icon: 'pi pi-fw pi-home', to: route('dashboard') },
                verCategoria && { label: 'Categoria Producto', icon: 'pi pi-fw pi-align-left', to: route('categoriaProducto.index') },
                verCargo && { label: 'Cargos', icon: 'pi pi-users pi-align-left', to: route('cargoPersonal.index') },
                verPersonal && { label: 'Personal', icon: 'pi  pi-id-card', to: route('personal.index') },
                verMaterial && { label: 'Material', icon: 'pi  pi-briefcase', to: route('material.index') },
                verEntrada && { label: 'Entrada de Material', icon: 'pi  pi-arrow-right', to: route('entradaMaterial.index') },
                verSalida && { label: 'Salida de Material', icon: 'pi  pi-arrow-left', to: route('salidaMaterial.index') },
                verUsuario && { label: 'Users', icon: 'pi  pi-user', to: route('userss.index') },
                verRoles && { label: 'Roles', icon: 'pi  pi-address-book', to: route('role.index') },
            ]
        },
    ];
    const filteredModel = model.map((item) => ({
        ...item,
        items: item.items.filter(Boolean),
    }));

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {filteredModel.map((item, i) => {
                    return !item?.seperator ? <Menuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
