import { useEffect, useState } from "react";
import type { ListRoutesType } from "./types/list-routes";
import { listRoutes } from "./services/list-routes";
import { useBoundStore } from "@/modules/core";

export const useCitizens = () => {
    const [listRoutesData, setListRoutesData] = useState<ListRoutesType[]>([])
    const [loadingRoutes, setLoadingRoutes] = useState(false);

    const { user } = useBoundStore()
    const idUser = user?.id || ''

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
    };

    useEffect(() => {
        listRoutesFetch()
    }, [idUser])

    return {
        listRoutesData,
        loadingRoutes
    }
}