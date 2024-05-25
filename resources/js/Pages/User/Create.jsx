import Layout from "@/Layouts/Layout.jsx";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useForm ,Link} from '@inertiajs/react';
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from 'primereact/dropdown';
import InputError from "@/Components/InputError";
import { useEffect } from "react";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { Password } from 'primereact/password';



export default function UserCreate({roles,flash,permisos}) {

    const verSalida = permisos.some(permiso => permiso.name === 'ver-salida');
    const crearSalida= permisos.some(permiso => permiso.name === 'crear-salida');
    const editarSalida= permisos.some(permiso => permiso.name === 'editar-salida');
    const reporteSalida = permisos.some(permiso => permiso.name === 'reporte-salida');

    const { data, setData, post, processing, errors, reset } = useForm({
      
        nombre: '',
        apellidos: '',
        email: '',
        password: '',
        password_confirmation: '',
        roleId:roles.length != 0 ?roles[0].id:'',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);


    const submit = (e) => {
        e.preventDefault();
        post(route('userss.store'));
    };

    

    return (
        <Layout permisos={permisos}>
            <div className="grid">
                <div className="col-12 md:col-12">
                    <div className="card" style={{ width: '100%' }}>
                        <h5>NUEVO USUARIO</h5>
                        <div className="grid">
                     
                            <div className="col-5 md:col-5">
                                <form onSubmit={submit} className="p-fluid">
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
                                            EMAIL
                                            </label>
                                            <InputText id="email" name="email" value={data.email} onChange={(e) => setData("email", e.target.value)} required keyfilter="email"/>
                                            {errors.email && <div className="text-red-500">{errors.email}</div>}
                                        </div>

                                    </div>

                                    <div className="-mx-3 md:flex mb-6">
                                        <div className="md:w-full px-3">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                            PASSWORD
                                            </label>
                                            <Password value={data.password} onChange={(e) => setData("password", e.target.value)} feedback={false} tabIndex={1} required/>
                          

                                            {errors.password && <div className="text-red-500">{errors.password}</div>}
                                        </div>

                                        <div className="md:w-full px-3">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                            CONFIRMAR PASSWORD
                                            </label>
                                            <Password value={data.password_confirmation} onChange={(e) => setData("password_confirmation", e.target.value)} feedback={false} tabIndex={1} required/>

                                            {errors.password_confirmation && <div className="text-red-500">{errors.password_confirmation}</div>}
                                        </div>

                                    </div>
   
                                    <div className="p-field mb-4 flex justify-between">
                                        <div className="flex">
                                        <Button type="submit" label="Guardar" className="p-button-sm mr-2" severity="info" outlined  />
                                            <Link className="p-button p-button-sm p-button-danger" href={route("userss.index")} style={{color:'white'}}>Cancelar</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-5 md:col-5">
                                <table className="items-center w-full border-collapse text-blueGray-700" >
                                    <thead class="thead-light ">
                                        <tr>
                                        <th colSpan={3}>ROLES</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {roles.map(role => (
                                        <tr key={role.id}>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <input
                                                    type="radio"
                                                    name="roleId"
                                                    value={role.id}
                                                    checked={data.roleId === role.id}
                                                    onChange={() => handleRoleChange(role.id)}
                                                />
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{role.name}</td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">({role.description})</td>
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