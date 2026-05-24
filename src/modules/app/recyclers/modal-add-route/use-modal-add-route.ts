import { useForm } from "react-hook-form"
import { schemaModalAddRoute, type ModalAddRouteType } from "./schema-modal-add-route"
import { zodResolver } from "@hookform/resolvers/zod"
import { MasterServiceLocalities } from "./services/master"
import { toast } from "react-toastify"
import type { ModalAddRouteMaster } from "./types/master"
import { useEffect, useState } from "react"
import { useBoundStore } from "@/modules"
import { newRoute } from "./services/new-route"

export const useModalAddRoute = (listRoutesFetch: () => Promise<void>, onClose: () => void) => {
    const { user } = useBoundStore()
    const idUser = user?.id || ''
    const [masterLocalities, setMasterLocalities] = useState<ModalAddRouteMaster[]>([])
    const form = useForm<ModalAddRouteType>({ resolver: zodResolver(schemaModalAddRoute) })

    const masterLocalitiesFetch = async () => {
        try {
            const localities = await MasterServiceLocalities()
            setMasterLocalities(localities)
        } catch (error) {
            console.log(error)
            toast.error("Error al cargar las localidades. Intenta de nuevo más tarde.")
            setMasterLocalities([])
        }
    }

    const onSubmit = (data: ModalAddRouteType) => {
        try {
            newRoute({ ...data, idUser })
            listRoutesFetch()
            onClose()
            toast.success("Ruta de recolección agregada exitosamente.")
        } catch (error) {
            console.log(error)
            toast.error("Error al agregar la ruta de recolección. Intenta de nuevo más tarde.")
        }
    }


    useEffect(() => {
        masterLocalitiesFetch()
    }, [])

    return {
        form,
        masterLocalities,
        onSubmit
    }
}