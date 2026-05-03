import { useBoundStore } from "@/modules/core";
import { Layout } from "@/modules/core/components/layout";


export default function Home() {
    const user = useBoundStore((s) => s.user);

    return (
        <Layout>
            <main className="w-full max-w-md bg-white rounded-4xl shadow-xl shadow-green-900/5 p-10 border border-gray-100 text-center">
                <div className="relative inline-block mb-6">
                    <div className="w-24 h-24 bg-green-50 rounded-3xl flex items-center justify-center mx-auto">
                        <span className="text-4xl text-green-600">
                            {user?.name?.charAt(0).toUpperCase() || "U"}
                        </span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-green-400 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-800 mb-1">
                    ¡Bienvenido, {user?.name || "Usuario"}!
                </h1>

                <div className="inline-block px-4 py-1.5 bg-green-50 rounded-full mb-8">
                    <p className="text-green-600 text-xs font-bold uppercase tracking-widest">
                        Rol: {user?.role.rolName || "No asignado"}
                    </p>
                </div>

                <div className="space-y-4">
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Has ingresado al sistema de gestión logística sostenible para
                        <span className="font-semibold text-gray-700"> Vereda Quiba y Ciudad Bolívar</span>.
                    </p>

                    <div className="pt-6 border-t border-gray-50">
                        <button className="w-full bg-gray-800 text-white py-4 rounded-2xl font-bold hover:bg-gray-700 transition-all shadow-lg shadow-gray-200">
                            Ver Rutas de Recolección
                        </button>
                    </div>
                </div>
            </main>
        </Layout>
    );
};