## CI/CD

El CI/CD del frontend fue implementado mediante CircleCI, el cual se activa cada vez que se sube un nuevo commit a la branch `master`

El flujo que sigue el CI/CD y que esta configurado en el repositorio del frontend en `.circleci/config.yml` sigue el siguiente flujo:

1. Instalación de  AWS CLI en un container docker.
2. Instalación de las dependencias necesarias para un proyecto Vue con Vite
3. Build del proyecto Vue el cual genera el contenido estático de la aplicación en el directorio `dist/`
4. Se configuran las credenciales de AWS y luego se sube a un bucket S3 el contenido presente en `dist/`
5. Se invalida la cache de Cloudfront para que se muestre siempre la última versión de la página servida en el bucket S3

El deploy de la página se hace de forma automática siempre y cuando no falle alguno de los pasos anteriormente nombrados.