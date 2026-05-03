import { useForm } from "react-hook-form"
import { LoginSchema, type LoginType } from "./login-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginService } from "../services"
import { toast } from "react-toastify"
import { useBoundStore } from "@/modules/core"
import { useNavigate } from "react-router"

export const useLogin = () => {
    const form = useForm<LoginType>({ resolver: zodResolver(LoginSchema), mode: 'onChange' })
    const navigate = useNavigate()

    const setAuth = useBoundStore((s) => s.setAuth)
    const resetAuth = useBoundStore((s) => s.resetAuth)

    const onSuccess = async (data: LoginType) => {
        try {
            const response = await LoginService(data)
            setAuth({
                ...response,
                loggedInAt: new Date()
            })
        } catch (error) {
            console.log(error)
            toast.error('Ocurrio un erro')
        }
    }

    const logout = async (): Promise<void> => {
        resetAuth()
        navigate('/')
        localStorage.removeItem('roleRoutes')
    }

    return {
        form,
        onSuccess,
        logout
    }
}