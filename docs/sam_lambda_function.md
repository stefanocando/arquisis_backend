# Lambda Function para generar un PDF

Este projecto contiene el código fuente y archivos de soporte para una aplicación serverless que se puede deployear con SAM CLI.

- pdf-generator - Código de la Lambda Function
- events - Eventos para probar la invocación de la función
- test - Test unitarios para el código de la aplicación
- template.yaml - Archivo de configuración que define los recursos AWS de la aplicación

Esta aplicación utiliza varios recursos de AWS, como la Lambda Function y una API Gateway API. Todos estos recursos estan definidos en `template.yaml`.

## Requisitos

- Tener AWS SAM CLI instalado.
- Crear un bucket S3 llamado `generatedpdfsbucket`
  - Dejar al bucket con permisos de acceso público
  - Configurar el bucket con la siguiente bucket policy
  ```
  {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::generatedpdfsbucket/*.pdf"
        }
    ]
  }
  ```

## Deploy de la aplicación

Para hacer build y deploy de la aplicación por primera vez, hay que correr el siguiente comando dentro del directorio donde se encuentra el proyecto de la Lambda Function.

```bash
sam build --use-container
sam deploy --guided
```

El primer comando hace build del código fuente de la aplicación. El segundo comando empaquetará e implementará la aplicación en AWS.

En base a la configuración en `template.yaml`, al hacer deploy de la aplicación se va a crear la Lambda Function y una API Gateway API con un POST endpoint el cual llamará a la Lambda Function.

Despues de hacer deploy de la Lambda Function hay que darle permisos para poder acceder a S3. Por lo tanto en la consola de IAM en la parte de `Access Management/Roles` hay que buscar la lambda function y seleccionarla. Luego agregar a los permisos de la Lambda Function `AmazonS3FullAccess`.

Hasta el momento nuestra Lambda Function funciona si es invocada de forma isolada pero aún no retorna ningún resultado si es llamda desde nuestra API Gateway API. Por lo tanto en nuestras configuraciones de API Gateway vamos a crear 3 modelos.

1. Input
  - Content type: application/json
  - Model schema:
  {
    "type":"object",
    "properties":{
        "group":{"type":"number"},
        "user_name":{"type":"string"},
        "user_mail":{"type":"string"},
        "ticket_id":{"type":"string"}
    },
    "title":"Input"
}

2. Output
  - Content type: application/json
  - Model schema:
    {
    "type":"object",
    "properties":{
        "url":{"type":"string"}
    },
    "title":"Output"
}

3. Result
  - Content type: application/json
  - Model schema:
  {
    "type":"object",
    "properties":{
        "input":{
            "$ref":"https://apigateway.amazonaws.com/restapis/<api_id>/models/Input"
        },
        "output":{
            "$ref":"https://apigateway.amazonaws.com/restapis/<api_id>/models/Output"
        }
    },
    "title":"Output"
}
- El api_id se puede ver arriba a la izquierda en la consola de API Gateway

## Probar la Lambda Function del proyecto

Para probar la Lambda Function de nuestro proyecto se puede hacer una POST request con el siguiente comando:


```
curl --header "Content-Type: application/json" -d '{"group": "23", "user_name": "user_name", "user_mail": "user_mail", "ticket_id": "1234"}' https://2nrlawti8d.execute-api.us-east-1.amazonaws.com/Prod/pdf-generator/
```

Debería retornar la url donde se guardo el PDF con la información prevista en el body de la request.