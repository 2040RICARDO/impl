import Layout from "@/Layouts/Layout.jsx";
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Link,router, useForm } from '@inertiajs/react';
import { Tooltip } from 'primereact/tooltip';
import { Dialog } from 'primereact/dialog';
import Swal from 'sweetalert2';
import { Message } from 'primereact/message';
import PrimaryButton from "@/Components/PrimaryButton";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function EntradaMaterialIndex({ auth, entradaMateriales, message,permisos  }) {

    const verEntrada = permisos.some(permiso => permiso.name === 'ver-entrada');
    const crearEntrada = permisos.some(permiso => permiso.name === 'crear-entrada');
    const editarEntrada= permisos.some(permiso => permiso.name === 'editar-entrada');
    const reporteEntrada = permisos.some(permiso => permiso.name === 'reporte-entrada');


    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [filteredEntradaMaterial, setFilteredEntradaMaterial] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [selectedEntradaMaterial, setSelectedMaterial] = useState(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if(message != null){
            notify(message);
        }
        setFilteredEntradaMaterial(entradaMateriales);
    }, [entradaMateriales]);

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
        filterEntradaMaterial(e.target.value);
    };

    const filterEntradaMaterial = (value) => {
        const filtered = entradaMateriales.filter(material => {
            return material.id.toString().includes(value) ||
                material.descripcion.toLowerCase().includes(value.toLowerCase()) 
        });
        setFilteredEntradaMaterial(filtered);
    };

    const showEntradaMaterialDetails = (material) => {
        setSelectedMaterial(material);
        setVisible(true);
    };

    const onHide = () => {
        setVisible(false);
    };
    
    /////////////////////REPORTE ///////////////////
    const obtenerFechaActual = () => {
        const fecha = new Date();
        const year = fecha.getFullYear();
        const month = fecha.getMonth() + 1;
        const day = fecha.getDate();
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    };

    const { data, setData, post, processing, errors } = useForm({
        fechaInicio: obtenerFechaActual(),
        fechaFinal: obtenerFechaActual(),
    });

    const [visibleReporte, setVisibleReporte] = useState(false);

    const showMaterialReporte = () => {
        setVisibleReporte(true);
    };

    const onHideReporte = () => {
        setVisibleReporte(false);
    };

    const handleReporte = () => {
        const fechaInicio = data.fechaInicio;
        const fechaFinal = data.fechaFinal;
        window.open( `/reporte/entradaMaterial/${fechaInicio}/${fechaFinal}`, '_blank');
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
                    crearEntrada&&(
                        <Link href={route("entradaMaterial.create")} className="p-button p-button-warning" style={{ marginLeft: '10px',color:'black' }}>Nueva Entrada de Material</Link>
                    )
                }
                {
                    reporteEntrada && (
                        <Link onClick={(e) => { e.preventDefault(); showMaterialReporte(); }} className="p-button p-button-info" style={{ marginLeft: '10px',color:'black' }}>Reporte</Link>
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
                            <h5>Lista de Entradas</h5>
                            <DataTable value={filteredEntradaMaterial} paginator first={first} rows={rows} onPage={onPageChange} header={header}
                                emptyMessage="No hay registros encontrados">
                                <Column field="id" header="ID" />
                                <Column field="nombre" header="Material" />
                                <Column field="categoria" header="Categoria" />
                                <Column field="cantidad" header="Tipo" />
                                <Column field="fecha" header="Fecha Entrada" />
                                <Column header="" body={(rowData) => (
                                    <div className="flex justify-around">
                                        
                                        {
                                            (rowData.control_entrada ==true  && editarEntrada )&&(
                                                <Link href={`/entradaMaterial/edit/${rowData.id}`} className="p-button p-button-success p-button-rounded p-button-sm" style={{ textDecoration: 'none', padding: '0.25rem 0.5rem', fontSize: '0.75rem', marginRight: '5px', borderRadius: '20px' }}>
                                                    <Tooltip target=".edit-link" content="Editar" position="bottom" />
                                                    <i className="pi pi-pencil pencil-icon edit-link" style={{ marginRight: '2px', fontSize: '0.80rem', color: 'black', verticalAlign: 'middle' }}></i>
                                                </Link>
                                            )
                                        }
                                        <Link   Link onClick={(e) => { e.preventDefault(); showEntradaMaterialDetails(rowData); }} className="p-button p-button-info p-button-rounded p-button-sm" style={{ textDecoration: 'none', padding: '0.25rem 0.5rem', fontSize: '0.75rem', marginRight: '5px', borderRadius: '20px' }}>
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
                {selectedEntradaMaterial && (
                   <div class="min-h-screen flex items-center justify-center px-4">
    
                   <div class="max-w-4xl  bg-whiterounded-lg shadow-xl">
                       <div class="p-4 border-b">
                           <h2 class="text-2xl ">
                               INFORMACION DE LA ENTRADA DE  MATERIAL
                           </h2>
                           <p class="text-sm text-gray-500">
                               {selectedEntradaMaterial.nombre} - ({selectedEntradaMaterial.codigo})
                           </p>
                       </div>
                       <div>
                           <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                               <p class="text-gray-600">
                                   CATEGORIA
                               </p>
                               <p>
                                  {selectedEntradaMaterial.categoria}
                               </p>
                           </div>
                           <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                               <p class="text-gray-600">
                                   DESCRIPCION DE ENTRADA
                               </p>
                               <p>
                                  {selectedEntradaMaterial.descipcion}
                               </p>
                           </div>
                           <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                               <p class="text-gray-600">
                                   CANTIDAD
                               </p>
                               <p>
                                   {selectedEntradaMaterial.cantidad}
                               </p>
                           </div>
                           <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                               <p class="text-gray-600">
                                  COSTO UNITARIO
                               </p>
                               <p>
                                   {selectedEntradaMaterial.costo_unitario}
                               </p>
                           </div>
                           <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                               <p class="text-gray-600">
                                  COSTO TOTAL
                               </p>
                               <p>
                                   {selectedEntradaMaterial.costo_total}
                               </p>
                           </div>
                           <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                               <p class="text-gray-600">
                                    FECHA REGISTRO
                               </p>
                               <p>
                                   {selectedEntradaMaterial.fecha}
                               </p>
                           </div>
                           <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                               <p class="text-gray-600">
                                    GESTION
                               </p>
                               <p>
                                   {selectedEntradaMaterial.gestion}
                               </p>
                           </div>

                    
                       </div>
                   </div>
               </div>
                )}
            </Dialog>

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
                               REPORTE DE ENTRADA DE MATERIAL
                           </h2>
                       </div>
                       <div>
                      {/*  <form onSubmit={handleReporte}  className="mt-6 space-y-6"> */}
                            <div className="-mx-3 md:flex mb-6">
                                <div className="md:w-full px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                        FECHA INICIO 
                                    </label>
                                    <DatePicker
                                        id="fechaInicio"
                                        selected={data.fechaInicio}
                                        onChange={(date) => {
                                            const year = date.getFullYear();
                                            const month = date.getMonth() + 1; // Sumamos 1 porque los meses van de 0 a 11
                                            const day = date.getDate();
                                            const formattedDateInicio = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                                            setData('fechaInicio', formattedDateInicio);
                                        }}
                                        autocomplete="off"
                                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                    />
                    
                                </div>
                                <div className="md:w-full px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                        FECHA FINAL
                                    </label>
                                    <DatePicker
                                        id="fechaFinal"
                                        selected={data.fechaFinal}
                                        onChange={(date) => {
                                            const year = date.getFullYear();
                                            const month = date.getMonth() + 1; // Sumamos 1 porque los meses van de 0 a 11
                                            const day = date.getDate();
                                            const formattedDateFinal = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                                            setData('fechaFinal', formattedDateFinal);
                                        }}
                                        autocomplete="off"
                                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                    />
                    
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