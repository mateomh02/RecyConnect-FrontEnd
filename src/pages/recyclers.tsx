import { Layout } from "@/modules/core/components/layout";
import { MapPin, MoreVertical, Navigation2, Plus } from "lucide-react";

export default function Recyclers() {
    const PUNTOS_CERCANOS = [
        { id: 1, nombre: "Punto Acopio Quiba Alta", distancia: "200m", direccion: "Calle 70 Sur #18-20", tipo: "Prioritario" },
        { id: 2, nombre: "Contenedor Comunitario 4", distancia: "850m", direccion: "Carrera 19 #65-10", tipo: "Normal" },
        { id: 3, nombre: "Punto Limpio Ciudad Bolívar", distancia: "1.5km", direccion: "Av. Principal #12-45", tipo: "Normal" },
        { id: 4, nombre: "Estación de Reciclaje Rural", distancia: "3.2km", direccion: "Vía Quiba km 2", tipo: "Lejano" },
    ];

    return (
        <Layout>
            <div className="w-full max-w-4xl space-y-6 animate-fade-in">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Rutas de Recolección</h1>
                        <p className="text-gray-400 text-sm">Gestiona tus puntos de parada</p>
                    </div>
                    <button className="flex items-center gap-2 bg-green-500 text-white px-5 py-3 rounded-2xl font-bold shadow-lg shadow-green-200 hover:bg-green-600 transition-all active:scale-95">
                        <Plus size={20} />
                        Agregar ruta
                    </button>
                </div>

                <div className="w-full bg-white rounded-4xl border border-gray-100 shadow-xl shadow-green-900/5 overflow-hidden">
                    <div className="h-72 bg-gray-100 relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=4.55,-74.15&zoom=14&size=800x400&sensor=false')] bg-cover opacity-40"></div>

                        <div className="relative z-10 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-white shadow-2xl flex flex-col items-center gap-3">
                            <div className="p-3 bg-green-100 rounded-2xl">
                                <Navigation2 className="text-green-600 animate-bounce" size={24} />
                            </div>
                            <p className="text-sm font-bold text-gray-700 tracking-tight text-center">
                                Google Maps <br />
                                <span className="text-xs text-gray-400 font-medium">Visualizando ruta óptima</span>
                            </p>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-bold text-gray-700 flex items-center gap-2">
                                <MapPin size={18} className="text-green-500" />
                                Puntos de parada cercanos
                            </h2>
                            <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-md font-black uppercase">Ordenado por distancia</span>
                        </div>

                        <div className="space-y-3">
                            {PUNTOS_CERCANOS.map((punto) => (
                                <div
                                    key={punto.id}
                                    className="group flex items-center justify-between p-4 bg-white border border-gray-50 rounded-2xl hover:border-green-100 hover:bg-green-50/30 transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors">
                                            <span className="text-xs font-bold text-green-600">{punto.distancia}</span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-800">{punto.nombre}</h4>
                                            <p className="text-xs text-gray-400 font-medium">{punto.direccion}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {punto.tipo === 'Prioritario' && (
                                            <span className="text-[9px] bg-red-50 text-red-500 font-black px-2 py-1 rounded-lg uppercase">Urgente</span>
                                        )}
                                        <button className="p-2 text-gray-300 hover:text-gray-600">
                                            <MoreVertical size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}