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



export default function UserCreate({roles,role,user,flash,permisos}) {


    const verSalida = permisos.some(permiso => permiso.name === 'ver-salida');
    const crearSalida= permisos.some(permiso => permiso.name === 'crear-salida');
    const editarSalida= permisos.some(permiso => permiso.name === 'editar-salida');
    const reporteSalida = permisos.some(permiso => permiso.name === 'reporte-salida');


    const { data, setData, put, processing, errors, reset } = useForm({
      
        roleIdP:role  == null?'':role.role_id,
        
        userId:user.id,
        roleId:role  == null?'':role.role_id,
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        put(route("userss.update",{ id: user.id }));
    };


    const handleRoleChange = (roleId) => {
        setData('roleId', roleId);
    };

    return (
        <Layout permisos={permisos}>
            <div className="grid">
                <div className="col-12 md:col-12">
                    <div className="card" style={{ width: '100%' }}>
                        <h5>EDITAR ROL DE USUARIO</h5>
                        <div className="grid">
                            <div className="col-3 md:col-3">
                            </div>
                            <div className="col-4 md:col-4">
                                <form onSubmit={submit} className="p-fluid">
                                    


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


                                    <div className="p-field mb-4 flex justify-between">
                                        <div className="flex">
                                        <Button type="submit" label="Actualizar" className="p-button-sm mr-2" severity="info" outlined  />
                                            <Link className="p-button p-button-sm p-button-danger" href={route("userss.index")} style={{color:'white'}}>Cancelar</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-3 md:col-3">
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </Layout>
    );
}