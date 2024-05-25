import Layout from "@/Layouts/Layout.jsx";
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Link,router } from '@inertiajs/react';
import { Tooltip } from 'primereact/tooltip';
import { Dialog } from 'primereact/dialog';
import Swal from 'sweetalert2';
import { Message } from 'primereact/message';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function MaterialIndex({ auth, materiales, message ,permisos }) {

    const verMaterial = permisos.some(permiso => permiso.name === 'ver-material');
    const crearMaterial= permisos.some(permiso => permiso.name === 'crear-material');
    const editarMaterial= permisos.some(permiso => permiso.name === 'editar-material');
    const reporteMaterial = permisos.some(permiso => permiso.name === 'reporte-material');

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [filteredMaterial, setFilteredMaterial] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [visible, setVisible] = useState(false);
   

    useEffect(() => {
        if(message != null){
            notify(message);
        }
        setFilteredMaterial(materiales);
    }, [materiales]);

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
        filterMaterial(e.target.value);
    };

    const filterMaterial = (value) => {
        const filtered = materiales.filter(material => {
            return material.id.toString().includes(value) ||
                material.nombre.toLowerCase().includes(value.toLowerCase()) ||
                material.unidad.toLowerCase().includes(value.toLowerCase()) 
        });
        setFilteredMaterial(filtered);
    };

    const showMaterialDetails = (material) => {
        setSelectedMaterial(material);
        setVisible(true);
    };

    const onHide = () => {
        setVisible(false);
    };

    /////////////////////REPORTE ///////////////////


    const handleReporte = () => {
        window.open( `/reporte/material`, '_blank');
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
                    crearMaterial&&(
                        <Link href={route("material.create")} className="p-button p-button-warning" style={{ marginLeft: '10px',color:'black' }}>Nuevo Material</Link>
                    )
                }
                {
                    reporteMaterial&&(
                        <Link onClick={(e) => { e.preventDefault(); handleReporte(); }} className="p-button p-button-info" style={{ marginLeft: '10px',color:'black' }}>Reporte</Link>
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
                            <h5>Lista de Materiales</h5>
                            <DataTable value={filteredMaterial} paginator first={first} rows={rows} onPage={onPageChange} header={header}
                                emptyMessage="No hay registros encontrados">
                                <Column field="id" header="ID" />
                                <Column field="nombre" header="Material" />
                                <Column field="categoria" header="Categoria" />
                                <Column field="unidad" header="Tipo" />
                                <Column field="cantidad_disponible" header="Disponible" />
                                <Column field="stock" header="Stock" />
                                <Column header="" body={(rowData) => (
                                    <div className="flex justify-around">
                                        {
                                            editarMaterial && (
                                                <Link href={`/material/edit/${rowData.id}`} className="p-button p-button-success p-button-rounded p-button-sm" style={{ textDecoration: 'none', padding: '0.25rem 0.5rem', fontSize: '0.75rem', marginRight: '5px', borderRadius: '20px' }}>
                                                    <Tooltip target=".edit-link" content="Editar" position="bottom" />
                                                    <i className="pi pi-pencil pencil-icon edit-link" style={{ marginRight: '2px', fontSize: '0.80rem', color: 'black', verticalAlign: 'middle' }}></i>
                                                </Link>
                                            )
                                        }
                                        
                                        <Link onClick={(e) => { e.preventDefault(); showMaterialDetails(rowData); }} className="p-button p-button-info p-button-rounded p-button-sm" style={{ textDecoration: 'none', padding: '0.25rem 0.5rem', fontSize: '0.75rem', marginRight: '5px', borderRadius: '20px' }}>
                                            <Tooltip target=".show-link" content="Ver" position="bottom" />
                                            <i className="pi pi-eye pencil-icon show-link" style={{ marginRight: '2px', fontSize: '0.80rem', color: 'white', verticalAlign: 'middle' }}></i>
                                        </Link>
                                    </div>
                                )} />
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
                {selectedMaterial && (
                   <div class="min-h-screen flex items-center justify-center px-4">
    
                   <div class="max-w-4xl  bg-whiterounded-lg shadow-xl">
                       <div class="p-4 border-b">
                           <h2 class="text-2xl ">
                               INFORMACION DEL MATERIAL
                           </h2>
                           <p class="text-sm text-gray-500">
                               {selectedMaterial.nombre}
                           </p>
                       </div>
                       <div>
                           <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                               <p class="text-gray-600">
                                   CATEGORIA
                               </p>
                               <p>
                                  {selectedMaterial.categoria}
                               </p>
                           </div>
                           <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                               <p class="text-gray-600">
                                   TIPO
                               </p>
                               <p>
                                  {selectedMaterial.unidad}
                               </p>
                           </div>
                           <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                               <p class="text-gray-600">
                                   DESCRIPCION
                               </p>
                               <p>
                                   {selectedMaterial.descripcion}
                               </p>
                           </div>
                           <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                               <p class="text-gray-600">
                                  STOCK
                               </p>
                               <p>
                                   {selectedMaterial.stock}
                               </p>
                           </div>
                           <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                               <p class="text-gray-600">
                                  SALIDA DE MATERIAL
                               </p>
                               <p>
                                   {selectedMaterial.salida}
                               </p>
                           </div>
                           <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                               <p class="text-gray-600">
                                    ENTRADA DE MATERIAL
                               </p>
                               <p>
                                   {selectedMaterial.entrada}
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