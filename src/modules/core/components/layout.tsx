import { useLogin } from "@/modules/app"
import type { RouteProps } from "../types";
import { Link } from "react-router";

interface Props {
    children?: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
    const { logout } = useLogin()
    const storedRoutes = localStorage.getItem('roleRoutes')
    const accessibleRoutes = storedRoutes ? JSON.parse(storedRoutes) : []
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
            <nav className="w-full max-w-5xl bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">♻️</span>
                    <h2 className="text-xl font-bold text-gray-800 tracking-tight">
                        Recy <span className="text-green-400">Connect</span>
                    </h2>
                </div>
                <div className="w-0.5 h-7 bg-gray-500 m-1.5"></div>
                <div className="flex gap-2 flex-row items-center mr-auto">
                    {accessibleRoutes.toReversed().map((r: RouteProps, index: number) => (
                        <div key={r.id || index}>
                            <Link
                                to={r.path ?? ''}
                                className="px-4 py-2 text-sm font-semibold text-gray-500 rounded-xl transition-all duration-200 hover:bg-green-50 hover:text-green-600 active:scale-95"
                            >
                                {r.name ?? 'Enlace'}
                            </Link>
                        </div>
                    ))}
                </div>
                <button
                    onClick={logout}
                    className="text-sm font-semibold text-red-400 hover:text-red-500 transition-colors"
                >
                    Cerrar Sesión
                </button>
            </nav>
            {children}
            <p className="mt-auto pt-8 text-xs text-gray-300 font-medium uppercase tracking-widest">
                Sistema SUA • Bogotá 2026
            </p>
        </div>
    )
}