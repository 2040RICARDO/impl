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

export default function RoleIndex({ auth, roles, message ,permisos }) {
    const verCategoria = permisos.some(permiso => permiso.name === 'ver-roles');
    const crearRoles = permisos.some(permiso => permiso.name === 'crear-roles');
    const editarRoles= permisos.some(permiso => permiso.name === 'editar-roles');

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [filteredRoles, setFilteredRoles] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');


    useEffect(() => {
        if(message != null){
            notify(message);
        }
        setFilteredRoles(roles);
    }, [roles]);


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
        const filtered = roles.filter(rol => {
            return rol.id.toString().includes(value) ||
                rol.name.toLowerCase().includes(value.toLowerCase()) 
        });
        setFilteredRoles(filtered);
    };


    const header = (
        <div className="flex justify-between items-center">
            <span className="p-input-icon-left" style={{ marginRight: '10px' }}>
                <i className="pi pi-search" />
                
                <InputText type="search" value={globalFilter} onChange={onInputChange} placeholder="Buscar..." />
            </span>
            <div className="items-end">
                {
                    crearRoles &&(
                        <Link href={route("role.create")} className="p-button p-button-warning" style={{ marginLeft: '10px',color:'black' }}>Nuevo Rol </Link>
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
                            <h5>Lista de Roles </h5>
                            <DataTable value={filteredRoles} paginator first={first} rows={rows} onPage={onPageChange} header={header}
                                emptyMessage="No hay registros encontrados">
                                <Column field="id" header="ID" />
                                <Column field="name" header="Nombre" />
                                <Column field="description" header="Descripcion" />
                                <Column header="" body={(rowData) => (
                                    <div className="flex justify-around">
                                        {
                                            editarRoles&&(
                                                <Link href={`/role/edit/${rowData.id}`} className="p-button p-button-success p-button-rounded p-button-sm" style={{ textDecoration: 'none', padding: '0.25rem 0.5rem', fontSize: '0.75rem', marginRight: '5px', borderRadius: '20px' }}>
                                                    <Tooltip target=".edit-link" content="Editar" position="bottom" />
                                                    <i className="pi pi-pencil pencil-icon edit-link" style={{ marginRight: '2px', fontSize: '0.80rem', color: 'black', verticalAlign: 'middle' }}></i>
                                                </Link>
                                            )
                                        }
                                    </div>
                                )}/>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}