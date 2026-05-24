import { useBoundStore } from "@/modules/core"
import { deleteListRoute, listRoutes } from "./services/list-routes"
import type { ListRoutesType } from "./types/list-routes"
import { useEffect, useState } from "react"
import { toast } from "react-toastify/unstyled"

export const useRecyclers = () => {
    const { user } = useBoundStore()
    const idUser = user?.id || ''
    const [listRoutesData, setListRoutesData] = useState<ListRoutesType[]>([])
    const [loadingRoutes, setLoadingRoutes] = useState(false);


    const listRoutesFetch = async () => {
        setLoadingRoutes(true);

        if (!navigator.geolocation) {
            console.error("Tu navegador no soporta geolocalización");
            setLoadingRoutes(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const routes = await listRoutes(idUser, latitude, longitude);
                    setListRoutesData(routes);
                } catch (error) {
                    console.error("Error al traer las rutas desde el backend:", error);
                } finally {
                    setLoadingRoutes(false);
                }
            },
            (error) => {
                console.error("Error obteniendo la ubicación:", error.message);
                setLoadingRoutes(false);
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    };;

    const deleteRoute = async (routeId: number) => {
        try {
            await deleteListRoute(routeId);
            toast.success("Ruta eliminada correctamente");
            listRoutesFetch()
        } catch (error) {
            console.log(error)
            toast.error("Error al eliminar la ruta");
        }
    }

    useEffect(() => {
        listRoutesFetch()
    }, [idUser])

    return { listRoutesData, deleteRoute, listRoutesFetch, loadingRoutes }
}