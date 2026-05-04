💻 SUA Frontend - RecyConnect
Esta es la interfaz de usuario del proyecto SUA, una aplicación web diseñada para la gestión de rutas y logística de reciclaje, construida con React y Vite.

🛠️ Tecnologías utilizadas
Framework: React.js

Herramienta de construcción: Vite

Gestor de paquetes: pnpm

Estado y Consultas: TanStack Query (React Query) / Zustand

Estilos: CSS Modules / Tailwind (según tu configuración)

📋 Requisitos Previos
Node.js (Versión 18 o superior)

pnpm (npm install -g pnpm)

Backend en ejecución: Asegúrate de que el servidor NestJS esté corriendo para que el login funcione.

⚙️ Configuración del Proyecto

1. Instalación de dependencias
   Instala los módulos necesarios con el siguiente comando:

pnpm install

2. Variables de Entorno
   Crea un archivo .env en la raíz de esta carpeta. Es fundamental para la comunicación con la API:

Fragmento de código

VITE_BASE_URL=http://localhost:3000
[!IMPORTANT]

Si cambias el puerto del Backend (NestJS), debes actualizar este archivo .env con la nueva URL para evitar errores de conexión (CORS).

🏃‍♂️ Ejecución del Proyecto
Para iniciar el servidor de desarrollo:

Bash

pnpm run dev
La aplicación se abrirá normalmente en: http://localhost:5173

🔑 Acceso al Sistema

Puedes registrarte como nuevo usuario o utilizar las siguientes credenciales de prueba que ya están cargadas en la base de datos:

Usuario Contraseña
usuario1@gmail.com 123456789
usuario2@gmail.com 123456789

📂 Notas de Desarrollo
Conexión API: Todas las peticiones apuntan a la ruta definida en VITE_BASE_URL.

Autenticación: El sistema maneja sesiones mediante tokens (JWT). Si no puedes iniciar sesión, verifica que el backend esté devolviendo el token correctamente.
