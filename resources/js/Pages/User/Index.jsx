import Layout from "@/Layouts/Layout.jsx";
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Link,router } from '@inertiajs/react';
import { Tooltip } from 'primereact/tooltip';

import { Message } from 'primereact/message';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog } from 'primereact/dialog';

export default function RoleIndex({ auth, users, message,permisos  }) {

    const verUsuario = permisos.some(permiso => permiso.name === 'ver-usuario');
    const crearUsuario = permisos.some(permiso => permiso.name === 'crear-usuario');
    const editarUsuario = permisos.some(permiso => permiso.name === 'editar-usuario');



    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [filteredRoles, setFilteredRoles] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');


    useEffect(() => {
        if(message != null){
            notify(message);
        }
        setFilteredRoles(users);
    }, [users]);


    const notify = (message) => toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const onInputChange = (e) => {
        setGlobalFilter(e.target.value);
        filterRoles(e.target.value);
    };

    const filterRoles = (value) => {
        const filtered = users.filter(rol => {
            return rol.id.toString().includes(value) ||
                rol.name.toLowerCase().includes(value.toLowerCase()) 
        });
        setFilteredRoles(filtered);
    };

    /////////////modal////////////

    const [selectedUser, setSelectedUser] = useState(null);
    const [visible, setVisible] = useState(false);

    const showMaterialDetails = (material) => {
        setSelectedUser(material);
        setVisible(true);
    };

    const onHide = () => {
        setVisible(false);
    };
    /////////////MOdal///////////


    const header = (
        <div className="flex justify-between items-center">
            <span className="p-input-icon-left" style={{ marginRight: '10px' }}>
                <i className="pi pi-search" />
                
                <InputText type="search" value={globalFilter} onChange={onInputChange} placeholder="Buscar..." />
            </span>
            <div className="items-end">
                {
                    crearUsuario&&(
                        <Link href={route("userss.create")} className="p-button p-button-warning" style={{ marginLeft: '10px',color:'black' }}>Nuevo Usuario </Link>
                    )
                }
                
            </div>
        </div>
    );
    return (
        <>
            <Layout permisos={permisos}>
                <div>
                    <ToastContainer />
                </div>
                <div className="grid">
                    <div className="col-12 md:col-12">
                        <div className="card">
                            <h5>Lista de Usuarios </h5>
                            <DataTable value={filteredRoles} paginator first={first} rows={rows} onPage={onPageChange} header={header}
                                emptyMessage="No hay registros encontrados">
                                <Column field="id" header="ID" />
                                <Column field="name" header="Nombre" />
                                <Column field="email" header="Email" />
                                <Column header="" body={(rowData) => (
                                    <div className="flex justify-around">

                                        {
                                            editarUsuario&&(
                                                <Link href={`/userss/edit/${rowData.id}`} className="p-button p-button-success p-button-rounded p-button-sm" style={{ textDecoration: 'none', padding: '0.25rem 0.5rem', fontSize: '0.75rem', marginRight: '5px', borderRadius: '20px' }}>
                                                    <Tooltip target=".edit-link" content="Editar Rol" position="bottom" />
                                                    <i className="pi pi-pencil pencil-icon edit-link" style={{ marginRight: '2px', fontSize: '0.80rem', color: 'black', verticalAlign: 'middle' }}></i>
                                                </Link>
                                            )
                                        }
                                        
                                        <Link onClick={(e) => { e.preventDefault(); showMaterialDetails(rowData); }} className="p-button p-button-info p-button-rounded p-button-sm" style={{ textDecoration: 'none', padding: '0.25rem 0.5rem', fontSize: '0.75rem', marginRight: '5px', borderRadius: '20px' }}>
                                            <Tooltip target=".show-link" content="Ver" position="bottom" />
                                            <i className="pi pi-eye pencil-icon show-link" style={{ marginRight: '2px', fontSize: '0.80rem', color: 'white', verticalAlign: 'middle' }}></i>
                                        </Link>
                                    </div>
                                )}/>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </Layout>



            <Dialog
                visible={visible}
                modal
                onHide={onHide}
                style={{ width: '60%', minWidth: '300px'}}
             
            >
                {selectedUser && (
                   <div class="min-h-screen flex items-center justify-center px-4">
    
                   <div class="max-w-4xl  bg-whiterounded-lg shadow-xl">
                       <div class="p-4 border-b">
                           <h2 class="text-2xl ">
                               INFORMACION DEL USUARIO
                           </h2>
                           <p class="text-sm text-gray-500">
                               {selectedUser.nombre} {selectedUser.apellidos}
                           </p>
                       </div>
                       <div>
                           <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                               <p class="text-gray-600">
                                   EMAIL
                               </p>
                               <p>
                                  {selectedUser.email}
                               </p>
                           </div>
                           <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                               <p class="text-gray-600">
                                   CONTRASEÑA
                               </p>
                               <p>
                                  {selectedUser.contrasena}
                               </p>
                           </div>
                           <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                               <p class="text-gray-600">
                                   ROL
                               </p>
                               <p>
                                  {selectedUser.role}
                               </p>
                           </div>
                       </div>
                   </div>
               </div>
                )}
            </Dialog>

        </>
    );
}