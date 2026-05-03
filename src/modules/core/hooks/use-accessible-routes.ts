import { filterAccessibleRoutes, routes } from '@/routes'
import { useEffect, useState } from 'react'
import { getRoleRoutes, useBoundStore, type RouteProps } from '@/modules'

export const useAccessibleRoutes = (user: { roleId: number } | null) => {
  const [roleRoutes, setRoleRoutes] = useState<RouteProps[]>([])
  const { resetAuth, user: userBoundStore } = useBoundStore()

  const fnGetRoleRoutes = async () => {
    const storedRoutes = localStorage.getItem('roleRoutes')
    if (storedRoutes) {
      const parsedStoredRoutes = JSON.parse(storedRoutes)
      setRoleRoutes(parsedStoredRoutes)
    }

    if (user) {
      try {
        const newRoutes = await getRoleRoutes(userBoundStore?.id)
        if (!storedRoutes || JSON.stringify(newRoutes) !== storedRoutes) {
          setRoleRoutes(newRoutes)
          localStorage.setItem('roleRoutes', JSON.stringify(newRoutes))
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
        resetAuth()
      }
    }
  }

  useEffect(() => {
    fnGetRoleRoutes()
  }, [user])

  const accessibleRoutes = [...filterAccessibleRoutes(routes, user !== null, roleRoutes)]
  console.log(accessibleRoutes)
  return { accessibleRoutes }
}
