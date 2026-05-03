import { recyConnectApi } from "@/modules/core"
import type { RegisterProps, RegisterResponse } from "../types/register"

export const RegisterApi = (data: RegisterProps): Promise<RegisterResponse> => {
    return recyConnectApi.post('/auth/register', data)
}