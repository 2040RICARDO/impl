import Layout from "@/Layouts/Layout.jsx";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useForm ,Link} from '@inertiajs/react';
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from 'primereact/dropdown';
import InputError from "@/Components/InputError";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";




export default function EntradaMaterialEdit({errors,materiales,entradaMaterial,material ,permisos}) {

    const { data, setData, put } = useForm({
        descripcion: entradaMaterial.descripcion,
        cantidad: entradaMaterial.cantidad,
        costo_unitario: entradaMaterial.costo_unitario,

        descripcionMaterial:material.descripcion,
        materialId: material.id,
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route("entradaMaterial.update",{ id: entradaMaterial.id }));
    }

    useEffect(() => {
        const hasErrors = Object.keys(errors).length > 0;
        if (hasErrors || flash.message != null  ) {
            notify('Ocurrio un problema!')
        } 
    }, [flash]);

    const notify = (message) => toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });


    return (
        <Layout permisos={permisos}>
            <div>
                <ToastContainer />
            </div>
            <div className="grid">
                <div className="col-12 md:col-12">
                    <div className="card" style={{ width: '100%' }}>
                        <h5>NUEVA ENTRADA DE MATERIAL</h5>

                        <div className="grid">
                            <div className="col-2 md:col-2"></div>
                            <div className="col-8 md:col-8">
                                <form onSubmit={handleSubmit} className="p-fluid">
                                    <div className="-mx-3 md:flex mb-6">
                                        <div className="md:w-full px-3">
                                        
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                                CANTIDAD
                                            </label>
                                            <InputText keyfilter="int" id="cantidad" name="cantidad" value={data.cantidad}  
                                                onChange={(e) => {
                                                    const inputValue_cantidad = e.target.value.trim(); 
                                                    if (inputValue_cantidad === '' || (parseInt(inputValue_cantidad) >= 0 && !isNaN(parseInt(inputValue_cantidad)))) {
                                                        setData("cantidad", inputValue_cantidad === '' ? '' : parseInt(inputValue_cantidad));
                                                    }

                                                    /* if (!isNaN(data.cantidad) && data.cantidad >= 0 && !isNaN(data.costo_unitario) && data.costo_unitario >= 0) {
                                                        const costoTotal = data.cantidad * data.costo_unitario;
                                                        setData({ costo_total: costoTotal.toFixed(2) });
                                                    } */
                                                }} 
                                                required
                                            />
                                            {errors.cantidad && <div className="text-red-500">{errors.cantidad}</div>}
                                        </div>
                                        <div className="md:w-full px-3">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                                COSTO UNITARIO
                                            </label>
                                            <InputText
                                                id="costo_unitario"
                                                name="costo_unitario"
                                                value={data.costo_unitario}
                                                onChange={(e) => {
                                                    const inputValue = e.target.value.trim(); 
                                                    const parsedValue = parseFloat(inputValue.replace(',', '.')); 

                                                    if (!isNaN(parsedValue) && parsedValue >= 0) { 
                                                        setData("costo_unitario", parsedValue.toFixed(2).replace('.', ','));
                                                    }
                                                }}
                                                keyfilter={/^[0-9,]+$/} 
                                                required
                                            />
                                            {errors.costo_unitario && <div className="text-red-500">{errors.costo_unitario}</div>}
                                        </div>

                                        {/* <div className="md:w-full px-3">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                                COSTO TOTAL
                                            </label>
                                            <InputText keyfilter="int" id="costo_total" name="costo_total" value={data.costo_total} onChange={(e) => setData("costo_total", e.target.value.toUpperCase())} required/>
                                            {errors.costo_total && <div className="text-red-500">{errors.costo_total}</div>}
                                        </div>
 */}
                                    </div>



                                    <div className="-mx-3 md:flex mb-6">
                                        <div className="md:w-full px-3">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                                MATERIAL
                                            </label>
                                            <select
                                                id="materialId"
                                                className=" block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                                value={data.materialId}
                                                onChange={(e) => {
                                                    setData('materialId', e.target.value);

                                                    const selectedMaterialId = parseInt(e.target.value);
                                                    const selectedMaterial = materiales.find(material => material.id === selectedMaterialId);
                                                    if (selectedMaterial) {
                                                        setData({
                                                            descripcionMaterial:selectedMaterial.descripcion
                                                        }) 
                                                    }
                                                }}
                                                required
                                            >
                                                {materiales.map((material) => (
                                                    <option key={material.id} value={material.id}>{material.nombre}</option>
                                                ))}
                                            </select>
                                            <InputError className="text-red text-xs italic" message={errors.materialId} />
                                        </div>
                                        <div className="md:w-full px-3">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                            DESCRIPCION MATERIAL
                                            </label>
                                            <InputTextarea id="descripcionMaterial" name="descripcionMaterial" autoResize value={data.descripcionMaterial} onChange={(e) => setData("descripcionMaterial",e.target.value)} rows={5} cols={30}  disabled />
                                            {errors.descripcionMaterial && <div className="text-red-500">{errors.descripcionMaterial}</div>}
                                        </div>
                                    </div>



                                    
                                    <div className="-mx-3 md:flex mb-6">
                                        
                                        <div className="md:w-full px-3">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                            DESCRIPCION
                                            </label>
                                            <InputTextarea id="descripcion" name="descripcion" autoResize value={data.descripcion} onChange={(e) => setData("descripcion",e.target.value)} rows={5} cols={30} required />
                                            {errors.descripcion && <div className="text-red-500">{errors.descripcion}</div>}
                                        </div>
                                    </div>


                                    <div className="p-field mb-4 flex justify-between">
                                        <div className="flex">
                                            <Button type="submit" label="Actualizar" className="p-button-sm mr-2" severity="info" outlined  />
                                            <Link className="p-button p-button-sm p-button-danger" href={route("entradaMaterial.index")} style={{color:'white'}}>Cancelar</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-2 md:col-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}