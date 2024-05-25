import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import { Dialog } from 'primereact/dialog';
import {InputText} from "primereact/inputtext";

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    const DialogHeaderContent = (
        <h2 className="text-lg font-medium text-gray-900 pl-4 pt-2 mb-0">
            ¿Estás segura de que quieres eliminar tu cuenta?
        </h2>
    );


    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Borrar cuenta</h2>

                <p className="mt-1 text-sm text-gray-600">
                Una vez que se elimine su cuenta, todos sus recursos y datos se eliminarán permanentemente. Antes
                     Al eliminar su cuenta, descargue cualquier dato o información que desee conservar.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion} className="mt-2">Borrar</DangerButton>

            <Dialog className="px-6" header={DialogHeaderContent} visible={confirmingUserDeletion} style={{ width: '50vw' }}  onHide={() => setConfirmingUserDeletion(false)}>
                <form onSubmit={deleteUser} className="px-4">
                    <p className="mt-1 text-sm text-gray-600">
                    Una vez que se elimine su cuenta, todos sus recursos y datos se eliminarán permanentemente. Por favor
                         ingrese su contraseña para confirmar que desea eliminar permanentemente su cuenta.
​
                    </p>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Contraseña" className="sr-only" />

                        <InputText
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Contraseña"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>

                        <DangerButton className="ml-3" disabled={processing}>
                            Borrar Cuenta
                        </DangerButton>
                    </div>
                </form>
            </Dialog>
        </section>
    );
}
