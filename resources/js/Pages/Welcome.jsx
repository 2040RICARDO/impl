import { Link, Head } from '@inertiajs/react';
import {LayoutContext, LayoutProvider} from "@/Layouts/Component/layoutcontext.jsx";
import {PrimeReactProvider} from "primereact/api";
import React, {useContext} from "react";

export default function Welcome({ auth }) {
    return (
        <>
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
                        <img src="/assets/image/imprenta.jpg"  className="md:max-w-full md:h-auto" />
                    </div>
                </div>
            </div>
                    

            <br />
            <br /><br /><br /><br />

            <div class="py-16 bg-white">  
                <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                    <div class="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                        <div class="md:5/12 lg:w-5/12">
                        <img src="/assets/image/1.png" alt="image" loading="lazy"  />
                        </div>
                        <div class="md:7/12 lg:w-6/12">
                        <h2 class="text-2xl text-gray-900 font-bold md:text-4xl">Nuestra Mision</h2>
                        <p class="mt-6 text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum omnis voluptatem accusantium nemo perspiciatis delectus atque autem! Voluptatum tenetur beatae unde aperiam, repellat expedita consequatur! Officiis id consequatur atque doloremque!</p>
                        <p class="mt-4 text-gray-600"> Nobis minus voluptatibus pariatur dignissimos libero quaerat iure expedita at? Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia.</p>
                        </div>
                    </div>
                </div>
            </div>
        <br />
        <br /><br /><br /><br />
        <div class="py-16 bg-white">  
            <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                <div class="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                    <div class="md:7/12 lg:w-6/12">
                        <h2 class="text-2xl text-gray-900 font-bold md:text-4xl">Nuestra Vision</h2>
                        <p class="mt-6 text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum omnis voluptatem accusantium nemo perspiciatis delectus atque autem! Voluptatum tenetur beatae unde aperiam, repellat expedita consequatur! Officiis id consequatur atque doloremque!</p>
                        <p class="mt-4 text-gray-600"> Nobis minus voluptatibus pariatur dignissimos libero quaerat iure expedita at? Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia.</p>
                    </div>
                    <div class="md:5/12 lg:w-5/12">
                        <img src="/assets/image/1.png" alt="image" loading="lazy" width="" height="" />
                    </div>
                    
                </div>
            </div>
        </div>

        <footer class="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
		    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://www.facebook.com/100064187645453/posts/1743336182375458/" class="hover:underline" target="_blank">Imprenta Unsxx</a>. Todos los derechoe reservados.
            </span>
                <ul class="flex flex-wrap items-center mt-3 sm:mt-0">
                    <li>
                        <a href="http://unsxx.edu.bo/" class="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Unsxx</a>
                    </li>

                </ul>
            </footer>
        </>
    );
}
