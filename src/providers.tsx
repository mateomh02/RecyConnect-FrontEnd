import { Suspense } from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

export function Providers() {
    return (
        <>
            <Suspense fallback={<div>Cargando...</div>}>
                <Outlet />
            </Suspense >
            <ToastContainer position='top-right' />
        </>
    )
}