import type { RouteProps } from './modules'

const LoadingFallback = () => <div>Cargando aplicación...</div>


export const routes: RouteProps[] = [
    {
        isAuthRestricted: true,
        lazy: async () =>
            await import('@/pages/login').then(({ Login }) => ({
                element: <Login />
            })),
        path: '/',
        HydrateFallback: LoadingFallback,
    },
    {
        isAuthRestricted: true,
        lazy: async () =>
            await import('@/pages/login').then(({ Login }) => ({
                element: <Login />
            })),
        path: '*',
        HydrateFallback: LoadingFallback,
    },
    {
        isAuthRestricted: true,
        lazy: async () =>
            await import('@/pages/register').then(({ Register }) => ({
                element: <Register />
            })),
        path: '/register',
        HydrateFallback: LoadingFallback,
    },
]

export function filterAccessibleRoutes(
    routes: RouteProps[],
    isAuthenticated: boolean,
    roleRoutes: RouteProps[] = []
): RouteProps[] {
    const unifyRouter = roleRoutes?.map((route: RouteProps) => {
        const newRoutes = {
            isAuthRestricted: false,
            path: route?.path,
            lazy: async () =>
                await import(`./pages/${route?.component}.tsx`).then((module) => {
                    const Component = module.default
                    return { element: <Component /> }
                }),
            HydrateFallback: LoadingFallback,
        }

        return newRoutes
    })

    const newRoutes = [...routes, ...unifyRouter]
    if (isAuthenticated) {
        return (newRoutes?.filter((route) => !route.isAuthRestricted) as RouteProps[]) ?? []
    } else {
        return (newRoutes?.filter((route) => route.isAuthRestricted) as RouteProps[]) ?? []
    }
}