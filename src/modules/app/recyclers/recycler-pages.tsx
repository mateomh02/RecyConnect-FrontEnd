import { MapPin, Plus } from "lucide-react";
import { useState } from "react";
import { ModalAddRoute } from "./modal-add-route";
import { useRecyclers } from "./use-recyclers";
import { cn } from "@/modules/core";
import { MdDeleteForever } from "react-icons/md";

export const RecyclerPages = () => {
    const [showModal, setShowModal] = useState(false);
    const { listRoutesData, deleteRoute, listRoutesFetch, loadingRoutes } = useRecyclers()
    const [pointSelected, setPointSelected] = useState({ lat: 4.60971, lng: -74.08175 })
    return (
        <>
            <div className="w-full max-w-4xl space-y-6 animate-fade-in">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Rutas de Recolección</h1>
                        <p className="text-gray-400 text-sm">Gestiona tus puntos de parada</p>
                    </div>
                    <button className="cursor-pointer flex items-center gap-2 bg-green-500 text-white px-5 py-3 rounded-2xl font-bold shadow-lg shadow-green-200 hover:bg-green-600 transition-all active:scale-95" onClick={() => setShowModal(true)}>
                        <Plus size={20} />
                        Agregar ruta
                    </button>
                </div>

                <div className="w-full bg-white rounded-4xl border border-gray-100 shadow-xl shadow-green-900/5 overflow-hidden">
                    <div className="h-72 bg-gray-100 relative flex items-center justify-center">
                        <iframe
                            src={`https://maps.google.com/maps?q=${pointSelected.lat},${pointSelected.lng}&z=${14}&output=embed`}
                            width="100%"
                            height="500px"
                            style={{ border: "none", borderRadius: "12px" }}
                            title="Mapa"
                            className="w/full h-full"
                        />
                    </div>

                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-bold text-gray-700 flex items-center gap-2">
                                <MapPin size={18} className="text-green-500" />
                                Puntos de parada cercanos
                            </h2>
                            <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-md font-black uppercase">Ordenado por distancia</span>
                        </div>

                        <div className="space-y-3 max-h-112.5 overflow-y-auto">
                            <div className="pt-4">
                                {loadingRoutes ? <div className="w-full bg-white rounded-3xl p-12 shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-4 animate-fade-in">
                                    <div className="w-10 h-10 border-4 border-gray-100 border-t-[#00D97E] rounded-full animate-spin" />
                                    <div className="text-center">
                                        <p className="text-sm font-bold text-gray-700">
                                            Cargando rutas...
                                        </p>
                                        <p className="text-xs text-gray-400 mt-0.5">
                                            Obteniendo ubicación y calculando distancias
                                        </p>
                                    </div>

                                </div> : (listRoutesData?.map(route => (
                                    <div
                                        key={route.id}
                                        className="relative group flex items-center justify-between p-4 bg-white border border-gray-50 rounded-2xl hover:border-green-100 hover:bg-green-50/30 transition-all"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors">
                                                <span className="text-xs font-bold text-green-600">{route.distanciaKm}</span>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-800">{route.routeName}</h4>
                                                <p className="text-xs text-gray-400 font-medium">{route.locality.name}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <span className={cn("absolute -top-2 right-2 text-[9px] bg-red-50 font-black px-2 py-1 rounded-lg uppercase", route.status === 'URGENTE' ? "bg-red-500 text-white" : "bg-green-400 text-white")}>
                                                {route.status === 'URGENTE' ? "Urgente" : "Próxima"}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <button className="cursor-pointer text-sm text-gray-400 font-medium p-2  hover:text-gray-600" onClick={() => setPointSelected({ lat: route.locality.latitud, lng: route.locality.longitud })}>
                                                    Ver en el mapa
                                                </button>
                                                <button className="p-2 text-red-500 hover:text-gray-600" onClick={() => deleteRoute(route.id)}>
                                                    <MdDeleteForever size={25} />
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                )))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalAddRoute
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                listRoutesFetch={listRoutesFetch}
            />
        </>
    )
}