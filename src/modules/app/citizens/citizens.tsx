import { Input } from "@/modules/core";
import { Calendar, ChevronRight, Clock, MapPin } from "lucide-react";
import { useCitizens } from "./use-citizens";
import { useState } from "react";

export const CitizensPage = () => {
    const { loadingRoutes, listRoutesData } = useCitizens()
    const [search, setSearch] = useState("")

    const filteredRoutes = listRoutesData?.filter(route =>
        route.locality.name.toLowerCase().includes(search?.toLowerCase()) ||
        route.routeName.toLowerCase().includes(search?.toLowerCase())
    )
    return (
        <div className="w-full max-w-4xl animate-fade-in">
            <div className="flex flex-col mb-8 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-800 mb-1">Rutas de Recolección</h1>
                <p className="text-gray-400 font-medium">Revisa los recorridos de tu zona mas cercana </p>
            </div>

            <Input
                placeholder="Buscar tu barrio"
                className="border-gray-400 mb-1.5 max-w-[40%]"
                value={search}               // 👈
                onChange={(e) => setSearch(e.target.value)} // 👈
            />

            <div className="grid gap-6">
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

                </div> : (filteredRoutes?.map(route => (
                    <div
                        key={route.id}
                        className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-green-900/5 flex flex-col md:flex-row items-center justify-between hover:border-green-200 transition-all group"
                    >
                        <div className="flex items-start gap-4 w-full md:w-auto">
                            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center shrink-0">
                                <MapPin className="text-green-500 w-6 h-6" />
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                                    {route.routeName}
                                </h3>
                                <p className="text-gray-400 text-sm font-medium mb-3">{route.locality.name}</p>

                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        <Clock className="w-4 h-4 text-green-400" />
                                        {route.hour}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        <Calendar className="w-4 h-4 text-green-400" />
                                        {route.day}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mt-6 md:mt-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0">
                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${route.status === 'URGENTE' ? 'bg-green-100 text-green-700 animate-pulse' :
                                route.status === 'PROXIMO' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-500'
                                }`}>
                                {route.status === 'PROXIMO' ? 'PROGRAMADO' : 'EN CURSO'}
                            </span>

                            <button className="p-3 bg-gray-50 rounded-xl group-hover:bg-green-500 group-hover:text-white transition-all">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )))}
            </div>
        </div>
    )
}