import { recyConnectApi } from "@/modules/core";
import type { NewRouteParams } from "../types/new-route";

export const newRoute = (params: NewRouteParams) => {
    return recyConnectApi.post('localities/route-new', params);
}