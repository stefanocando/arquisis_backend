# 2023-1 / IIC2173 - E2 | CPE Ticket Seller
*aka.* Coordinación de Pagos en base a Eventos 

🟢 : Logrado 🟡 : Medianamente Logrado 🔴 : No logrado

## Requisitos funcionales (13 ptos)
- **RF01 (3 ptos) (Esencial):** Cada usuario debe tener la capacidad de agregar dinero a una
"billetera" dentro de su aplicación.
- **RF02 (2 ptos) (Esencial):** Cuando un usuario compre una entrada dentro de su aplicación, se
debe validar que tenga el dinero suficiente en su billetera, y si es así, descontarle el dinero
internamente para enviarlo a la API central.
- **RF03 (3 ptos) (Esencial):** Para validar su compra deben hacer la llamada como se explica
previamente y realizar el cálculo de los challenges mediante workers.
- **RF04 (2 ptos):** Debe haber un indicador que muestre si el servicio maestro de workers está
disponible.
- **RF05 (3 ptos):** Los usuarios deben poder descargar su entrada si esta se validó
correctamente desde su vista de compras.

## Requisitos no funcionales (38 ptos)
- **RNF01 (15 ptos):** Deben crear el servicio que hace el cálculo de la prueba criptográfica de
pagos indicada en el enunciado, el cual asigna tareas a workers, lleva el registro de trabajos y
los resultados. Este servicio existe en un container independiente, se conecta via HTTP
ofreciendo una API REST y posee workers conectados mediante un broker con capacidad de
encolado/pubsub (Redis/rabbitMQ), así como conexión a la base de datos del backend
principal.
    - Separar los workers en contenedores propios tiene un bonus de 5 ptos
- **RNF02 (4 ptos):** Una vez que se reciba una validación de un pago hecho en su aplicación,
deberán enviar una notificación vía correo a los usuarios que lo solicitaron.

- 🟡 **RNF03 (5 ptos):** La aplicación tiene que ofrecer un servicio de generacion de tickets PDF
desde AWS Lambda (como los que genera la página kupos.cl). Este ticket debe tener el
nombre de su grupo y los datos del usuario y la entrada que compró. Además, debe
almacenarse en S3 y se le debe entregar al usuario un enlace público para descargarlo desde
S3. Deben utilizar Serverless.js o AWS SAM para manejar y desplegar esta función.
    - Crear un pipe CI/CD para este servicio tiene un bonus de 4 ptos

- **RNF04 (9 ptos):** Deben implementar CD en su pipeline CI/CD para backend. Como
proveedores aceptados de CI están Github Actions, Codebuild y CircleCI. Para deployment
deben usar AWS codedeploy.

- 🟢 **RNF05 (5 ptos):** Deben implementar CD en su pipeline CI/CD para frontend. Como
proveedores aceptados de CI están Github Actions, Codebuild y CircleCI. Para deployment
deben subir su frontend a AWS S3 e invalidar la caché de Cloudfront que sirve su frontend.

## Documentación (9 ptos)
Todos estos documentos los deben dejar dentro de su repositorio de Github en una carpeta /docs
para la fecha de entrega.
- **RDOC1 (2 ptos):** Deben actualizar su diagrama UML de componentes con lo realizado en esta
entrega, con explicaciones y detalle sobre el sistema.

- 🟡 **RDOC2 (2 ptos):** Deben actualizar su documentación del pipeline CI para incluir los pasos
extras necesarios para la realización del CD.

-🟢 **RDOC3 (2 ptos):** Deben incluir una documentación de cómo subir su aplicación en
Serverless/SAM, paso a paso

- **RDOC4 (3 ptos):** Deben documentar todas las posibles llamadas a sus APIs expuestas a sus
clientes con algún estandar (Postman, Swagger u otra)


## Recomendaciones

* Comiencen la entrega lo antes posible, puesto que es mas sencillo ir trabajando de a partes y seguro tendrán dudas. Se les dio plazo extra para que se adecuen a sus equipos de trabajo.
* Planifiquen con antelación: pregunten dudas o ambigüedades a sus ayudantes.
* Ojo con los deploys a última hora, la maldición de la demo es muy real.
* Ocupen el Free Tier de AWS, que tiene capacidad para todos estos requerimientos. Deberían usar los siguientes servicios:
	* **EC2**: AWS les proporciona una instancia t2.micro gratuita al mes.
	* **S3**: Tienen 5 GB de almacenamiento y 20000 solicitudes GET.
	* **RDS** (Opcional, Recomendado): Tienen 20GB y una instancia básica al mes.
	* **API Gateway**: 1 MM de llamadas al mes
	* **Lambda (Opcional)**: Tienen 400K GB/s y 1 MM de solicitudes.
	* **EBS**: 30 GB al mes para almacenamiento de discos de sistema.
	* **Cloudfront**: 50 GB al mes de transferencia.
	* **Amazon SES**: 62000 mensajes salientes / mes.
* **NO** está planificado hacer devolución por uso de dolares en AWS. Para la entrega el free tier de AWS es suficiente para conseguir todos los puntos. En caso de utilizar dólares en su solución, el curso no puede hacerles devolución de estos bajo ninguna causa.
* Usen una cuenta nueva o de alguien que no tenga otras cargas en AWS, para evitar cargos por ahora, además de usar una tarjeta prepago y los budget alerts de AWS para evitar costos oculto<sup>4</sup> .
* **USEN LEAFLET** para los mapas, o la API de google maps que tiene un free tier bastante generoso.

### Consideraciones

No se considerarán entregas:
* Con componentes que corran en sus computadores o servidores que no sean los básicos de AWS. Algunos ejemplos, los servicios de AWS serían:
    * EC2
    * VPC
    * IAM
    * S3
    * AWS API Gateway
    * CloudFront
    * Lambda
* Montadas en Heroku/Firebase/Elastic beanstalk/Lightsail/Netlify o similares.
* Que no estén documentadas.

Pueden utilizar cualquiera de los siguientes lenguajes. Los frameworks son los recomendados. Sugerimos que utilizen en cada grupo el lenguaje que todos sepan usar más o les parezca más sencillo de aprender. Los lenguajes en cursiva poseen ayudantes capaces de ayudarlos en su implementación de código.

* *Python*
    * FastAPI
    * Django
* *Javascript (js)*
    * Koa
    * Express
    * NestJS (solo si tienen muuuucha experiencia, aprenderan mucho)
* *Ruby*
    * Rails
* C# 
* Go 
* Rust

# Puntaje

### Atraso

Para esta entrega se les descontará 0.5 puntos en la nota máxima por horas Fibonacci con F1 = 6 y F2 = 6. 

Se considerará como atraso cualquier modificación en features o implementación que tenga que ver solo con lo que se pide en esta entrega.

| Fibonacci | Hora               | Nota maxima |
|-----------|--------------------|-------------|
| 6         | 0:01 - 5:59        | 6.5         |
| 6         | 6:00 - 11:59       | 6           |
| 12        | 12:00 - 23:59      | 5           |
| 18        | 24:00 - 41:59      | 4.5         |
| 30        | 42:00 - 71:59      | 4           |
| ...       | 72:00 en adelante  | 1           |

### Grupal

La nota se calcula como:

**E<sub>1 grupal</sub> = 1 + E<sub>1 RF</sub> + E<sub>1 RNF</sub> + E<sub>1 RDOC</sub>**

Siendo **E<sub>1 RF</sub>** el puntaje ponderado de los requisitos funcionales, y **E<sub>1 RNF</sub>** el correspondiente a los requisitos no funcionales y **E<sub>1 RDOC</sub>** de la documentación.

### Individual

Segun el programa del curso<sup>5</sup> , esto se evalua como:

**E<sub>1</sub> = 1 + ((E<sub>1 grupal</sub> - 1) * F<sub>g</sub>)**			
Donde F<sub>g</sub> es un factor de coevaluación asignado por el grupo que va de 0 a 1.2. Para esto se enviará un form de coevaluación donde cada integrante deberá evaluar a sus compañeros de grupo con una puntuación entre 1 y 5. 

**No podrán asignarle 5 puntos a más de un compañero, y sí lo hacen, se considerará que se entregó un máximo de 4 puntos a cada compañero**.

De no realizar la coevaluación, asumiremos que se le entregó el mismo puntaje de coevaluación a cada integrante, es decir 4 puntos.

## Links útiles

* [API Gateway - Rest API](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-rest-api.html)
* [Documentación de Auth0 con API Gateway](https://auth0.com/docs/customize/integrations/aws/aws-api-gateway-custom-authorizers)
* [Circle CI Blogs - CI para Django](https://circleci.com/blog/continuous-integration-for-django-projects/)
* Librerías UUID
    * [Python](https://pypi.org/project/uuid6/)
    * [NodeJS](https://www.npmjs.com/package//uuid)
    * [Ruby](https://www.uuidgenerator.net/dev-corner/ruby)

## Apoyo

Cada grupo tendrá un ayudante asignado el cuál podrán elegir mediante un link que se les mandará oportunamente. Este ayudante está encargado de hacerles seguimiento y orientar sus dudas para responderlas ellos mismos y el equipo de ayudantes. Les recomendamos **fuertemente** que pregunten sus dudas a su ayudante de seguimiento puesto que conocen del proyecto o pueden dirigir sus dudas a otros ayudantes. Puede ser de enunciado, código o algún tópico<sup>3</sup>  que tenga que ver con el proyecto

Dado que cada ayudante puede tener pequeñas diferencias en sus correcciones, queda a criterio de este hacer relajos o hacer mas estrictas ciertas particularidades. Intenten tener un flujo de comunicación directo con sus ayudantes para aclarar posibles diferencias o decisiones de diseño.

Pueden usar el Slack del curso para dudas más rápidas. Usen el [canal #e1](https://arqui-software.slack.com/archives/C037YKULFQF) para sus dudas.

Las ayudantías programadas relevantes para esto por ahora son:

* S3 Upload - 31/03
* Continuous Integration [Cápsula] - 06/04
* API Gateway + CORS - 21/04

También está presupuestada una sala de ayuda para el proyecto con fecha a anunciarse.

Se les avisará con antelación cuándo son y si habrá más.
