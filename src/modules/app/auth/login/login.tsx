import { Form } from "@/modules/core"
import { useLogin } from "./use-login"
import { InputField } from "@/modules/core/components/input-field"
import { Link } from "react-router"

export const LoginForm = () => {
    const { form, onSuccess } = useLogin()

    const { handleSubmit, control } = form

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6">
            <div className="w-full max-w-md bg-white rounded-4xl shadow-xl shadow-green-900/5 p-10 border border-gray-100">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-2xl mb-4">
                        <span className="text-3xl">♻️</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                        Recy <span className="text-green-400">Connect</span>
                    </h1>
                    <p className="text-gray-400 mt-2 font-medium">Logística sostenible para Bogotá</p>
                </div>
                <Form {...form}>
                    <form className="flex flex-col justify-center gap-2">
                        <InputField control={control} name="email" label="Correo Electronico" />
                        <InputField control={control} name="password" label="Contraseña" type="password" />
                        <button onClick={handleSubmit(onSuccess)} className="m-auto w-fit px-4 py-2 bg-green-500 text-white rounded-2xl font-bold shadow-lg shadow-green-200 hover:bg-green-600 hover:-translate-y-1 transition-all cursor-pointer">
                            Iniciar Sesión
                        </button>
                    </form>
                </Form>
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-400">
                        ¿Aún no eres parte?
                        <Link to='/register' className="text-green-500">  Registrate</Link>
                    </p>
                </div>
            </div>

            <p className="mt-8 text-xs text-gray-300 font-medium uppercase tracking-widest">
                Vereda Quiba & Ciudad Bolívar • 2026
            </p>
        </div>
    )
}