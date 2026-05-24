import { recyConnectApi } from "@/modules/core";
import type { ModalAddRouteMaster } from "../types/master";

export const MasterServiceLocalities = (): Promise<ModalAddRouteMaster[]> => {
    return recyConnectApi.get("/localities")
}