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

export default function CargoPersonalIndex({ auth, cargos, message,permisos  }) {

    const verCargo = permisos.some(permiso => permiso.name === 'ver-cargo');
    const crearCargo = permisos.some(permiso => permiso.name === 'crear-cargo');
    const editarCargo= permisos.some(permiso => permiso.name === 'editar-cargo');
    const reporteCargo = permisos.some(permiso => permiso.name === 'reporte-cargo');


    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [filteredCargos, setFilteredCategorias] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');


    useEffect(() => {
        if(message != null){
            notify(message);
        }
        setFilteredCategorias(cargos);
    }, [cargos]);


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
        filterCatgorias(e.target.value);
    };

    const filterCatgorias = (value) => {
        const filtered = cargos.filter(cargo => {
            return cargo.id.toString().includes(value) ||
                cargo.cargo.toLowerCase().includes(value.toLowerCase()) 
        });
        setFilteredCategorias(filtered);
    };


    const header = (
        <div className="flex justify-between items-center">
            <span className="p-input-icon-left" style={{ marginRight: '10px' }}>
                <i className="pi pi-search" />
                
                <InputText type="search" value={globalFilter} onChange={onInputChange} placeholder="Buscar..." />
            </span>
            <div className="items-end">
                {
                    crearCargo&&(
                        <Link href={route("cargoPersonal.create")} className="p-button p-button-warning" style={{ marginLeft: '10px',color:'black' }}>Nueva Cargo </Link>
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
                            <h5>Lista de Cargos </h5>
                            
                            <DataTable value={filteredCargos} paginator first={first} rows={rows} onPage={onPageChange} header={header}
                                emptyMessage="No hay registros encontrados">
                                <Column field="id" header="ID" />
                                <Column field="cargo" header="Categoria" />
                                <Column field="descripcion" header="Descripcion" />
                                <Column field="estado" header="Estado" body={(rowData) => (
                                    <Message severity={`${rowData.estado == 1?'success':'error'}`} text={`${rowData.estado == 1?'HABILITADO':'DESHABILITADO'}`} />
                                )}/>
                                <Column header="" body={(rowData) => (
                                    <div className="flex justify-around">
                                        {
                                            editarCargo &&(
                                                <Link href={`/cargoPersonal/edit/${rowData.id}`} className="p-button p-button-success p-button-rounded p-button-sm" style={{ textDecoration: 'none', padding: '0.25rem 0.5rem', fontSize: '0.75rem', marginRight: '5px', borderRadius: '20px' }}>
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