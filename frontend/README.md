# frontend-ticket-seller

This template should help get you started developing with Vue 3 in Vite.

## Correr el proyecto localmente

### Ir al directorio del frontend.

```sh
cd e1-2023-1-grupo-23/frontend

```

### Copiar lo siguiente en un archivo `.env` en el directorio raíz del repositorio.

```
VITE_API_SERVER_URL=http://localhost:8000
VITE_AUTH0_DOMAIN=dev-50f4e6m1x3lgsmgu.us.auth0.com
VITE_AUTH0_CLIENT_ID=pLjAz4iRagIEUEN8pnWrAah8MLiA7cMt
VITE_AUTH0_CALLBACK_URL=http://localhost:5173/callback
VITE_API_AUDIENCE=https://stefanocando.me/

```

### Instalar las dependencias.

```sh
npm install
```

### Levantar un servidor local

```
npm run dev -- --port 5173
```

PD: *es importante levantar el servidor en el puerto 5173 por temas de configuración de auth0*
