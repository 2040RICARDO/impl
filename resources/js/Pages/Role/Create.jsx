import Layout from "@/Layouts/Layout.jsx";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useForm ,Link} from '@inertiajs/react';
import { InputTextarea } from "primereact/inputtextarea";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";



export default function RoleCreate({errors,permissions,flash,permisos }) {
    const { data, setData, post } = useForm({
        name: "",
        //nombre_mostrar: "",
        descripcion: "",
        permisos:[]
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("role.store"));
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


    //////////////AÑADIR PERMISOS/////////
    const handleCheckboxChange = (e, roleId) => {
        const isChecked = e.target.checked;

        setData(prevData => ({
            ...prevData,
            permisos: isChecked
                ? [...prevData.permisos, roleId]
                : prevData.permisos.filter(id => id !== roleId),
        }));
    };
    //////////////AÑADIR PERMISOS/////////


    return (
        <Layout permisos={permisos}>
            <div>
                <ToastContainer />
            </div>
            <div className="grid">
                
                <div className="col-12 md:col-12">
                    <div className="card" style={{ width: '100%' }}>
                        <h5>NUEVA ROL</h5>


                        <div className="grid">
                        
                            <div className="col-6 md:col-6">
                                <form onSubmit={handleSubmit} className="p-fluid">
                                    <div className="-mx-3 md:flex mb-6">
                                        <div className="md:w-full px-3">
                                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                           ROL
                                        </label>
                                            <InputText id="name" name="name" value={data.name} onChange={(e) => setData("name", e.target.value)} required/>
                                            {errors.name && <div className="text-red-500">{errors.name}</div>}
                                        </div>
                                        
                                    </div>

                                    <div className="-mx-3 md:flex mb-5">
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
                                            <Link className="p-button p-button-sm p-button-danger" href={route("role.index")} style={{color:'white'}}>Cancelar</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-5 md:col-5 overflow-y-scroll"   style={{ height: '300px' }}>
                                <table className="items-center w-full border-collapse text-blueGray-700" >
                                    <thead class="thead-light ">
                                        <tr>
                                        <th colSpan={3}>PERMISOS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {permissions.map(per => (
                                        <tr key={per.id}>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <input type="checkbox" onChange={(e) => handleCheckboxChange(e, per.name)} />
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{per.name}</td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">({per.description})</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}