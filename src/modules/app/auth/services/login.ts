import { recyConnectApi, type LoginResponse } from "@/modules/core"
import type { LoginProps } from "../types"

export const LoginService = (body: LoginProps): Promise<LoginResponse> => {
    return recyConnectApi.post('/auth/login', body)
}