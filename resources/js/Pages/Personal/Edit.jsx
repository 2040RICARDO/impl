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



export default function PersonalEdit({errors,cargos,personal,permisos }) {

    const grados = [
        { label: 'LIC.', value: 'LIC.' },
        { label: 'ING.', value: 'ING.' },
        { label: 'DR.', value: 'DR.' },
        { label: 'DRA.', value: 'DRA.' },
        { label: 'M.SC. ING.', value: 'M.SC. ING.' },
        { label: 'M.SC. LIC.', value: 'M.SC. LIC.' },
        { label: 'M.SC.', value: 'M.SC.' },
        { label: 'SR.', value: 'SR.' },
        { label: 'SRA.', value: 'SRA.' },
        { label: 'DR.', value: 'DR.' },
        { label: 'T.S.', value: 'T.S.' },
        { label: 'CC.', value: 'CC.' },
    ];

    const { data, setData, put } = useForm({
        nombre: personal.nombre,
        apellidos:personal.apellidos ,
        ci: personal.ci,
        direccion: personal.direccion,
        celular: personal.ci,
        observacion: personal.observacion,
        grado: personal.grado,
        estado: personal.estado,
        cargoId: personal.cargo_id,
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route("personal.update",{ id: personal.id }));
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
        <Layout  permisos={permisos}>
            <div>
                <ToastContainer />
            </div>
            <div className="grid">
                
                <div className="col-12 md:col-12">
                    <div className="card" style={{ width: '100%' }}>
                        <h5>EDITAR PERSONAL</h5>


                        <div className="grid">
                            <div className="col-2 md:col-2"></div>
                            <div className="col-8 md:col-8">
                                <form onSubmit={handleSubmit} className="p-fluid">
                                    <div className="-mx-3 md:flex mb-6">
                                        <div className="md:w-full px-3">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                            NOMBRE
                                            </label>
                                            <InputText id="nombre" name="nombre" value={data.nombre} onChange={(e) => setData("nombre", e.target.value.toUpperCase())} required/>
                                            {errors.nombre && <div className="text-red-500">{errors.nombre}</div>}
                                        </div>
                                        <div className="md:w-full px-3">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                            APELLIDOS
                                            </label>
                                            <InputText id="apellidos" name="apellidos" value={data.apellidos} onChange={(e) => setData("apellidos", e.target.value.toUpperCase())} required/>
                                            {errors.apellidos && <div className="text-red-500">{errors.apellidos}</div>}
                                        </div>
                                        
                                    </div>
                                    <div className="-mx-3 md:flex mb-6">
                                        <div className="md:w-full px-3">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                            CEDULA DE IDENTIDAD
                                            </label>
                                            <InputText id="ci" name="ci" value={data.ci} onChange={(e) => setData("ci", e.target.value.toUpperCase())} required/>
                                            {errors.ci && <div className="text-red-500">{errors.ci}</div>}
                                        </div>
                                        <div className="md:w-full px-3">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                            CELULAR
                                            </label>
                                            <InputText id="celular" name="celular" value={data.celular} onChange={(e) => setData("celular", e.target.value.toUpperCase())} required keyfilter="int"/>
                                            {errors.celular && <div className="text-red-500">{errors.celular}</div>}
                                        </div>
                                        <div className="md:w-full px-3">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                            Direccion
                                            </label>
                                            <InputText id="direccion" name="direccion" value={data.direccion} onChange={(e) => setData("direccion", e.target.value.toUpperCase())} required     />
                                            {errors.direccion && <div className="text-red-500">{errors.direccion}</div>}
                                        </div>
                                    </div>

                                    <div className="-mx-3 md:flex mb-6">
                                        <div className="md:w-full px-3">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                                GRADO ACAD.
                                            </label>
                                            <Dropdown id="grado" name="grado" value={data.grado} options={grados} onChange={(e) => setData("grado", e.target.value)} optionLabel="label" placeholder="Seleccione un grado" />
                                            {errors.grado && <div className="text-red-500">{errors.grado}</div>}
                                        </div>
                                        <div className="md:w-full px-3">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                            CARGO
                                            </label>
                                            <select
                                                id="tipoId"
                                                className=" block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                                value={data.cargoId}
                                                onChange={(e) => setData('cargoId', e.target.value)}
                                                required
                                            >
                                                {cargos.map((cargo) => (
                                                    <option key={cargo.id} value={cargo.id}>{cargo.cargo}</option>
                                                ))}
                                            </select>
                                            <InputError className="text-red text-xs italic" message={errors.cargoId} />

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
                                        <div className="md:w-full px-3">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                                OBSERVACION
                                            </label>
                                            <InputTextarea id="observacion" name="observacion" autoResize value={data.observacion} onChange={(e) => setData("observacion",e.target.value)} rows={5} cols={30} required />
                                            {errors.observacion && <div className="text-red-500">{errors.observacion}</div>}
                                        </div>
                                        
                                    </div>

                                    <div className="p-field mb-4 flex justify-between">
                                        <div className="flex">
                                        <Button type="submit" label="Actualizar" className="p-button-sm mr-2" severity="info" outlined  />
                                            <Link className="p-button p-button-sm p-button-danger" href={route("personal.index")} style={{color:'white'}}>Cancelar</Link>
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