import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import {InputText} from "primereact/inputtext";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="flex align-items-center justify-content-center flex-column bg-yellow-100 h-screen">
                <div className="surface-card p-6 sm:p-4 shadow-2 border-round w-full lg:w-4">
                    <div className="text-center mb-5">
                        <div className="text-900 text-3xl font-medium mb-3">Nuevo Registro</div>
                    </div>
                    <form onSubmit={submit}>
                        <div>
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="block text-900 font-medium mb-2">Nombre</label>
                                    <InputText
                                        id="nombre"
                                        type="text"
                                        placeholder="Nombre"
                                        className="w-full"
                                        value={data.nombre}
                                        onChange={(e) => setData('nombre', e.target.value)}
                                    />
                                    <InputError message={errors.nombre} className=""/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="apellidos" className="block text-900 font-medium mb-2">Apellidos</label>
                                    <InputText
                                        id="apellidos"
                                        type="text"
                                        placeholder="Nombre"
                                        className="w-full"
                                        value={data.apellidos}
                                        onChange={(e) => setData('apellidos', e.target.value)}
                                    />
                                    <InputError message={errors.apellidos} className=""/>
                                </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
                                <InputText
                                    id="email"
                                    type="text"
                                    placeholder="Email "
                                    className="w-full"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className=""/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="block text-900 font-medium mb-2">Contraseña</label>
                                <InputText
                                    id="password"
                                    type="password"
                                    placeholder="Contraseña"
                                    className="w-full"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className=""/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password_confirmation" className="block text-900 font-medium mb-2">Conformar Contraseña</label>
                                <InputText
                                    id="password_confirmation"
                                    type="password"
                                    placeholder="Conformar Contraseña"
                                    className="w-full"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                                <InputError message={errors.password_confirmation} className=""/>
                            </div>

                            <div className="flex align-items-center justify-content-end mb-4">
                                <Link
                                    href={route('login')}
                                    className=""
                                >
                                    Ya registrado?
                                </Link>

                            </div>

                            <PrimaryButton label="Registrar" className="w-full" disabled={processing}/>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
