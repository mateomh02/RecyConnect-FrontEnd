import type { RouteObject } from 'react-router-dom'

export type RouteProps = {
    id?: number,
    path?: string,
    component?: string,
    name?: string
    isAuthRestricted?: boolean
} & Omit<RouteObject, 'children'>