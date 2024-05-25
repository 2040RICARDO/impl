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




export default function MaterialCreate({errors,categorias,flash,permisos }) {

    const unidades = [
        { label: 'und', value: 'und' },
        { label: 'kg', value: 'kg' },
        { label: 'gln', value: 'gln' },

    ];

    const { data, setData, post } = useForm({
        nombre: "",
        descripcion: "",
        unidad: unidades[0].value,
        categoriaId: categorias.length != 0 ?categorias[0].id:'',

    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("material.store"));
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
                        <h5>NUEVO MATERIAL</h5>


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
                                                CATEGORIA DE PRODUCTO
                                            </label>
                                            <select
                                                id="categoriaId"
                                                className=" block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                                value={data.categoriaId}
                                                onChange={(e) => setData('categoriaId', e.target.value)}
                                                required
                                            >
                                                {categorias.map((categoria) => (
                                                    <option key={categoria.id} value={categoria.id}>{categoria.categoria}</option>
                                                ))}
                                            </select>
                                            <InputError className="text-red text-xs italic" message={errors.categoriaId} />
                                        </div>
                                        
                                    </div>
                                    <div className="-mx-3 md:flex mb-6">
                                        <div className="md:w-full px-3">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                                UNIDAD
                                            </label>
                                            <select
                                                id="unidad"
                                                className=" block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                                value={data.unidad}
                                                onChange={(e) => setData('unidad', e.target.value)}
                                                required
                                            >
                                                {unidades.map((unidad) => (
                                                    <option key={unidad.value} value={unidad.value}>{unidad.label}</option>
                                                ))}
                                            </select>
                                            <InputError className="text-red text-xs italic" message={errors.unidad} />
                                        </div>
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