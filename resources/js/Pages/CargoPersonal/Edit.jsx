import Layout from "@/Layouts/Layout.jsx";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useForm ,Link} from '@inertiajs/react';
import { InputTextarea } from "primereact/inputtextarea";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";




export default function CargoPersonalEdit({errors,cargoPersonal,permisos }) {
    const { data, setData, put } = useForm({
        cargo: cargoPersonal.cargo,
        descripcion: cargoPersonal.descripcion,
        estado: cargoPersonal.estado,
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route("cargoPersonal.update",{ id: cargoPersonal.id }));
 
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
                        <h5>EDITAR CARGO</h5>


                        <div className="grid">
                            <div className="col-2 md:col-2"></div>
                            <div className="col-8 md:col-8">
                                <form onSubmit={handleSubmit} className="p-fluid">
                                    <div className="-mx-3 md:flex mb-6">
                                        <div className="md:w-full px-3">
                                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                           cargo
                                        </label>
                                            <InputText id="cargo" name="cargo" value={data.cargo} onChange={(e) => setData("cargo", e.target.value.toUpperCase())} required/>
                                            {errors.cargo && <div className="text-red-500">{errors.cargo}</div>}
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
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="estado">
                                                ESTADO
                                            </label>
                                            <div className="flex align-items-center ">
                                                <input type="radio" id="estado1" name="estado" value="1" checked={data.estado === 1} onChange={(e) => setData("estado", parseInt(e.target.value))} style={{ width: '1.5rem', height: '1.5rem' }} />
                                                <label htmlFor="estado1" className="ml-2">HABILITADO</label>
                                            </div>
                                            <div className="flex align-items-center pt-3">
                                                <input type="radio" id="estado2" name="estado" value="0" checked={data.estado === 0} onChange={(e) => setData("estado", parseInt(e.target.value))} style={{ width: '1.5rem', height: '1.5rem' }} />
                                                <label htmlFor="estado2" className="ml-2">DESHABILITADO</label>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="p-field mb-4 flex justify-between">
                                        <div className="flex">
                                            <Button type="submit" label="Actualizar" className="p-button-sm mr-2" severity="info" outlined  />
                                            <Link className="p-button p-button-sm p-button-danger" href={route("cargoPersonal.index")} style={{color:'white'}}>Cancelar</Link>
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