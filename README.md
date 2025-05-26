# kanban-app-test

## Descripción

Este proyecto es una aplicacion web para la gestion de tareas.

## Requisitos

- Node.js >= 20.16.0
- yarn >= 1.22.19

## Instalación

- Clonar el repositorio

```bash
git clone https://github.com/KevinDM15/kanban-app-test.git
cd kanban-app-test
```

- Instalar las dependencias

```bash
yarn install
```

- Iniciar el servidor de desarrollo frontend y backend API con JSON-SERVER

```bash
yarn dev
```

- Abrir el navegador y acceder a `http://localhost:5173/` o `https://kanban-app-test-production.up.railway.app` que es la API desplegada en Railway
- Para compilar el proyecto para producción, ejecutar:

```bash
yarn build
```

- Para acceder a el proyecto desplegado en vercel debes ingresar a esta ruta: `https://kanban-app-test.vercel.app/`

El proyecto fue desarrollado con React y Vite como bundler. Se utilizó Vite por su rapidez y simplicidad en la configuración. Para el manejo de estados se utilizó el contextAPI de React, lo que permite un manejo más eficiente del estado global de la aplicación para algo simple y evitar el prop drilling. Se ha manejado el diseño con Tailwind CSS para tener algo mas personalizable y sencillo y por su bajo peso en producción. Elegi React Hook Form para manejar las validaciones de formularios por su simplicidad y rapido aprendizaje.

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [CLSX](https://www.npmjs.com/package/clsx)
- [Tailwind Merge](https://www.npmjs.com/package/tailwind-merge)
- [React Hook Form](https://react-hook-form.com/)
