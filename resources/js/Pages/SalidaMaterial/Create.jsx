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



export default function SalidaMaterialCreate({errors,materiales,personales,flash,permisos }) {



    const { data, setData, post } = useForm({
        descripcion: "",
        cantidad: '',
        materialId: materiales.length != 0 ?materiales[0].id:'',
        personalId:personales.length != 0 ?personales[0].id:'',
        descripcionMaterial:materiales.length != 0 ?materiales[0].descripcion:'',
        cargo:personales.length != 0 ?personales[0].cargo:'',
        cantidadDisponible:materiales.length != 0 ?materiales[0].stock:'',
        disabledInput:materiales.length != 0 && materiales[0].stock != 0 ?false:true,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("salidaMaterial.store"));
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
                        <h5>NUEVA SALIDA DE MATERIAL</h5>
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
                                                disabled={data.disabledInput}
                                                onChange={(e) => {
                                                    const inputValue_cantidad = e.target.value.trim();
                                                    const cantidadIntroducida = inputValue_cantidad === '' ? '' : parseInt(inputValue_cantidad);
                                                    
                                                    if (cantidadIntroducida <= data.cantidadDisponible) {
                                                 
                                                            setData("cantidad", cantidadIntroducida);
                                                        
                                                        
                                                    } else {
                                                        console.log("La cantidad introducida supera la cantidad disponible");
                                                    }
                                                }} 
                                                required
                                            />

                                            <div className="text-gray-400">Cantida Disponible :{data.cantidadDisponible}</div>
                                            
                                            {errors.cantidad && <div className="text-red-500">{errors.cantidad}</div>}
                                        </div>
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
                                                            descripcion: data.descripcion,
                                                            cantidad:'',
                                                            personalId:data.personalId,
                                                            materialId:e.target.value,
                                                            descripcionMaterial:selectedMaterial.descripcion,
                                                            cantidadDisponible:selectedMaterial.stock,
                                                            disabledInput:selectedMaterial.stock != 0?false:true,
                                                            cargo:data.cargo,
                                                            
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
                                    <div className="-mx-3 md:flex mb-6">
                                        
                                        <div className="md:w-full px-3">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                                PERSONAL
                                            </label>
                                            <select
                                                id="personalId"
                                                className=" block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                                value={data.personalId}
                                                onChange={(e) => {
                                                    setData('personalId', e.target.value);
                                                    const selectedPersonalId = parseInt(e.target.value);
                                                    const selectedPersonal = personales.find(personal => personal.id === selectedPersonalId);
                                                    if (selectedPersonal) {
                                                        setData({
                                                            descripcion: data.descripcion,
                                                            cantidad:data.cantidad,
                                                            personalId:e.target.value,
                                                            materialId:data.materialId,
                                                            descripcionMaterial:data.descripcionMaterial,
                                                            cantidadDisponible:data.cantidadDisponible,
                                                            disabledInput:data.disabledInput,
                                                            cargo:selectedPersonal.cargo
                                                        }) 
                                                    }
                                                }}
                                                required
                                            >
                                                {personales.map((personal) => (
                                                    <option key={personal.id} value={personal.id}>{personal.grado}{personal.nombre} {personal.apellidos}</option>
                                                ))}
                                            </select>
                                            <InputError className="text-red text-xs italic" message={errors.personalId} />
                                        </div>
                                        <div className="md:w-full px-3">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                                CARGO PERSONAL
                                            </label>
                                            <InputText id="cargo" name="cargo" value={data.cargo}  
                                                onChange={(e) => {
                                                    setData('cargo', e.target.value)
                                                }} 
                                                disabled
                                            />
                                            {errors.cargo && <div className="text-red-500">{errors.cargo}</div>}
                                        </div>
                                    </div>


                                    <div className="p-field mb-4 flex justify-between">
                                        <div className="flex">
                                            <Button type="submit" label="Guardar" className="p-button-sm mr-2" severity="info" outlined  />
                                            <Link className="p-button p-button-sm p-button-danger" href={route("material.index")} style={{color:'white'}}>Cancelar</Link>
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