interface LocalityProps {
    id: string,
    name: string,
    latitud: number,
    longitud: number
}

export interface ListRoutesType {
    id: number,
    routeName: string,
    day: string,
    hour: string,
    distanciaKm: string,
    status: "PROXIMO" | "URGENTE",
    locality: LocalityProps
}