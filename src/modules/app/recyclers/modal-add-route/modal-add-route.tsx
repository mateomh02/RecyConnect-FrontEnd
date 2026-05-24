import { Form } from "@/modules";
import { useModalAddRoute } from "./use-modal-add-route";
import { SelectField } from "@/modules/core/components/select-field";
import { DateField } from "@/modules/core/components/date-field";
import { TimeField } from "@/modules/core/components/time-field";
import { InputField } from "@/modules/core/components/input-field";

interface ModalAddRouteProps {
    onClose: () => void;
    isOpen: boolean;
    listRoutesFetch: () => Promise<void>
}

export const ModalAddRoute = ({ onClose, isOpen, listRoutesFetch }: ModalAddRouteProps) => {
    const { form, masterLocalities, onSubmit } = useModalAddRoute(listRoutesFetch, onClose)
    const { control, handleSubmit } = form
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mx-4 transform transition-all scale-100">
                <div className="px-8 pt-8 pb-4 flex justify-between items-center">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800">Nueva Ruta de Recolección</h3>
                        <Form {...form}>
                            <div className="flex flex-col gap-2">
                                <InputField control={control} name="routeName" label="Nombre de la Ruta" placeholder="Ingresa el nombre de la ruta" />
                                <SelectField control={control} name="zone" label="Zona" options={masterLocalities ?? []} />
                                <DateField control={control} name="day" label="Fecha de Inicio" placeholder="Selecciona la fecha de inicio" />
                                <TimeField control={control} name="hour" label="Hora de Inicio" placeholder="Selecciona la hora de inicio" />
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button className="cursor-pointer flex items-center gap-2 bg-green-500 text-white px-5 py-3 rounded-2xl font-bold shadow-lg shadow-green-200 hover:bg-green-600 transition-all active:scale-95" onClick={handleSubmit(onSubmit)}>
                                    Agregar
                                </button>
                            </div>
                        </Form>
                        <p className="text-xs text-gray-500 mt-0.5">Asigna una zona y un horario para iniciar la jornada.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-50 absolute top-4 right-4"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};