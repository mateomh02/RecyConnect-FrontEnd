import { recyConnectApi } from "@/modules/core"
import type { ListRoutesType } from "../types/list-routes"

export const listRoutes = (userId: string, lat: number, lng: number): Promise<ListRoutesType[]> => {
    return recyConnectApi.get(`localities/user-routes/${userId}?lat=${lat}&lng=${lng}`)
}