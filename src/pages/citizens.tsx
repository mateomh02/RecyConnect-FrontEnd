import { Input } from "@/modules";
import { Layout } from "@/modules/core/components/layout";
import { Calendar, ChevronRight, Clock, MapPin } from "lucide-react";

export default function Citizens() {
  const MOCK_ROUTES = [
    {
      id: 1,
      zona: "Vereda Quiba - Sector Alto",
      horario: "08:00 AM - 12:00 PM",
      frecuencia: "Lunes y Jueves",
      encargado: "Asociación Eco-Quiba",
      estado: "En curso"
    },
    {
      id: 2,
      zona: "Ciudad Bolívar - Barrio El Paraíso",
      horario: "02:00 PM - 06:00 PM",
      frecuencia: "Martes y Viernes",
      encargado: "Recicladores Unidos",
      estado: "Programado"
    },
    {
      id: 3,
      zona: "Vereda Quiba - Sector Bajo",
      horario: "07:00 AM - 11:00 AM",
      frecuencia: "Miércoles y Sábado",
      encargado: "Sustentabilidad Bogotá",
      estado: "Finalizado"
    }
  ];
  return (
    <Layout>
      <div className="w-full max-w-4xl animate-fade-in">
        <div className="flex flex-col mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Rutas de Recolección</h1>
          <p className="text-gray-400 font-medium">Revisa los recorridos de tu zona mas cercana </p>
        </div>

        <Input placeholder="Buscar tu barrio" className="border-gray-400 mb-1.5 max-w-[40%]" />

        <div className="grid gap-6">
          {MOCK_ROUTES.map((route) => (
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
                    {route.zona}
                  </h3>
                  <p className="text-gray-400 text-sm font-medium mb-3">{route.encargado}</p>

                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <Clock className="w-4 h-4 text-green-400" />
                      {route.horario}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <Calendar className="w-4 h-4 text-green-400" />
                      {route.frecuencia}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 mt-6 md:mt-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${route.estado === 'En curso' ? 'bg-green-100 text-green-700 animate-pulse' :
                  route.estado === 'Programado' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                  {route.estado}
                </span>

                <button className="p-3 bg-gray-50 rounded-xl group-hover:bg-green-500 group-hover:text-white transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}