import Layout from "@/Layouts/Layout.jsx";
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Link,router, useForm } from '@inertiajs/react';
import { Tooltip } from 'primereact/tooltip';

import { Message } from 'primereact/message';
import Swal from 'sweetalert2';

import 'react-toastify/dist/ReactToastify.css';
import { Dialog } from 'primereact/dialog';
import PrimaryButton from "@/Components/PrimaryButton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function CategoriaProductoIndex({ auth, categorias, message,permisos}) {

    const verCategoria = permisos.some(permiso => permiso.name === 'ver-categoria');
    const crearCategoria = permisos.some(permiso => permiso.name === 'crear-categoria');
    const editarCategoria = permisos.some(permiso => permiso.name === 'editar-categoria');
    const reporteCategoria = permisos.some(permiso => permiso.name === 'reporte-categoria');


    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [filteredCategorias, setFilteredCategorias] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');


    useEffect(() => {
        if(message != null){
            notify(message);
        }
        setFilteredCategorias(categorias);
    }, [categorias]);

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
        const filtered = categorias.filter(categoria => {
            return categoria.id.toString().includes(value) ||
                categoria.categoria.toLowerCase().includes(value.toLowerCase()) 
        });
        setFilteredCategorias(filtered);
    };


    /////////////////////REPORTE ///////////////////

    const { data, setData, post, processing, errors } = useForm({
        estado: 4,
    });

    const [visibleReporte, setVisibleReporte] = useState(false);

    const showMaterialReporte = () => {
        setVisibleReporte(true);
    };

    const onHideReporte = () => {
        setVisibleReporte(false);
    };

    const handleReporte = () => {
        const estado = data.estado;
        window.open( `/reporte/categoria/${estado}`, '_blank');
    };
    /////////////////////REPORTE ///////////////////


    const header = (
        <div className="flex justify-between items-center">
            <span className="p-input-icon-left" style={{ marginRight: '10px' }}>
                <i className="pi pi-search" />
                
                <InputText type="search" value={globalFilter} onChange={onInputChange} placeholder="Buscar..." />
            </span>
            <div className="items-end">
                {
                    crearCategoria &&(
                        <Link href={route("categoriaProducto.create")} className="p-button p-button-warning" style={{ marginLeft: '10px',color:'black' }}>Nueva Categoria</Link>
                    )
                }
                {
                    reporteCategoria &&(
                        <Link onClick={(e) => { e.preventDefault(); showMaterialReporte(); }} className="p-button p-button-info" style={{ marginLeft: '10px',color:'black' }}>Reporte</Link>
                    )
                }
            </div>
    
        </div>
    );

    const HandleDelete = (e,id) => {
        e.preventDefault();
        Swal.fire({
            title: '¿Estás seguro de que quieres eliminar el personal?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                router.get(`/personal/destroy/${id}`);
            }
        });
    };

    
    
  
    return (
        <>
       
            <Layout permisos={permisos}>

                <div>
                    <ToastContainer />
                </div>


                <div className="grid">
                    <div className="col-12 md:col-12">
                        <div className="card">
                            <h5>Lista de Categorias</h5>
                            
                            <DataTable value={filteredCategorias} paginator first={first} rows={rows} onPage={onPageChange} header={header}
                                emptyMessage="No hay registros encontrados">
                                <Column field="id" header="ID" />
                                <Column field="categoria" header="Categoria" />
                                <Column field="descripcion" header="Descripcion" />
                                <Column field="estado" header="Estado" body={(rowData) => (
                                    <Message severity={`${rowData.estado == 1?'success':'error'}`} text={`${rowData.estado == 1?'HABILITADO':'DESHABILITADO'}`} />
                                )}/>
                                <Column header="" body={(rowData) => (
                                    <div className="flex justify-around">
                                        {
                                            editarCategoria&&(
                                                <Link href={`/categoriaProducto/edit/${rowData.id}`} className="p-button p-button-success p-button-rounded p-button-sm" style={{ textDecoration: 'none', padding: '0.25rem 0.5rem', fontSize: '0.75rem', marginRight: '5px', borderRadius: '20px' }}>
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
            <Dialog
                visible={visibleReporte}
                modal
                onHide={onHideReporte}
                style={{ width: '30%', minWidth: '200px'}}
            >
                   <div class="min-h-screen flex items-center justify-center px-4">
    
                   <div class="max-w-4xl  bg-whiterounded-lg shadow-xl">
                       <div class="p-4 border-b">
                           <h2 class="text-2xl ">
                               REPORTE CATEGORIAS
                           </h2>
                       </div>
                       <div>
                      {/*  <form onSubmit={handleReporte}  className="mt-6 space-y-6"> */}
                            <div className="-mx-3 md:flex mb-6">
                                <div className="md:w-full px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                        ESTADO 
                                    </label>
                                    <select
                                        id="estado"
                                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                        value={data.estado}
                                        onChange={(e) => setData('estado', e.target.value)}
                                        required
                                    >
                                      
                                        <option key="4" value={4}>TODOS</option>
                                        <option key="1" value={1}>HABILITADO</option>
                                        <option key="0" value={0}>DESHABILITADO</option>
                                    
                                    </select>
                    
                                </div>
                                    
                                </div>
                                <div className="p-field mb-4 flex justify-between">
                                        <div className="flex">
                                            <PrimaryButton onClick={(e) => { e.preventDefault(); handleReporte(); }}  className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" disabled={processing}>
                                                Reporte
                                            </PrimaryButton>
                                        </div>
                                    </div>  
                            {/* </form> */}

                       </div>
                   </div>
               </div>
            </Dialog>
        </>
    );
}