import { useForm } from "react-hook-form"
import { RegisterSchema, type RegisterType } from "./register-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterApi } from "../services/register"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"

export const useRegister = () => {
    const navigate = useNavigate()
    const form = useForm<RegisterType>({ resolver: zodResolver(RegisterSchema) })

    const onSucces = async (data: RegisterType) => {
        try {
            await RegisterApi(data)
            form.reset()
            navigate('/')
        } catch (error) {
            console.log(error)
            toast.error('Ocurrio un error')
        }
    }

    return { form, onSucces }
}