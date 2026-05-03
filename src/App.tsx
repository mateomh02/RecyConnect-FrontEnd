
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { useAccessibleRoutes, useBoundStore } from './modules'
import { Providers } from './providers'

function App() {
  const user = useBoundStore((s) => s.user)
  const { accessibleRoutes } = useAccessibleRoutes(user)
  return (
    <RouterProvider
      router={createBrowserRouter(
        [
          {
            children: accessibleRoutes,
            element: <Providers />
          }
        ],
        { basename: '/recy-connect' }
      )
      }

    />
  )
}

export default App
