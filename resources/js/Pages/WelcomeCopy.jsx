import { Link, Head } from '@inertiajs/react';
import {LayoutContext, LayoutProvider} from "@/Layouts/Component/layoutcontext.jsx";
import {PrimeReactProvider} from "primereact/api";
import React, {useContext} from "react";

export default function Welcome({ auth }) {
    return (
        <>
            <PrimeReactProvider>
                <LayoutProvider>
                    <Head title="Welcome" />
                    <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                        <div className="sm:fixed sm:top-0 sm:right-0 p-6">

                            <div className="flex align-items-center">
                                

                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="font-semibold text-white hover:text-white-900 dark:text-white-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                    >
                                        Home
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="font-semibold text-white hover:text-white dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                        >
                                            Ingresar
                                        </Link>

                                        <Link
                                            href={route('register')}
                                            className="ml-4 font-semibold text-white hover:text-white-900 dark:text-white-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                        >
                                            Registrar
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>


                        <div className="grid grid-nogutter surface-0 text-800">
                            <div className="col-12 md:col-8 p-6 text-center md:text-left flex align-items-center ">
                                <section>
                                    <span className="block text-6xl font-bold mb-1">IMPRENTA</span>
                                    <div className="text-6xl text-red-500 font-bold mb-3">Universidad Nacional Siglo "XX"</div>
                                </section>
                            </div>
                            <div className="col-12 md:col-4 overflow-hidden flex justify-center items-center">
                                <img src="/images/imprenta.jpg"  className="md:max-w-full md:h-auto" />
                            </div>
                        </div>
                    </div>
                    
                </LayoutProvider>
            </PrimeReactProvider>
        </>
    );
}
