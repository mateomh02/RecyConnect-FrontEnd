import { recyConnectApi } from "../auth-api";
import type { RouteProps } from "../types";

export async function getRoleRoutes(idUser?: string): Promise<RouteProps[]> {
    return await recyConnectApi.get(`/routes?userId=${idUser}`)
}