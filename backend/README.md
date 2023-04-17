---
tags: iic2713_2023_1
---
# Consideraciones Generales E0 :tada:

## Requisitos funcionales y no funcionales logrados

* Se logran realizar todos los requisitos  funcionales :white_check_mark:
* Se logran realizar todos los requisitos no funcionales :white_check_mark:

## Requisitos variables

* Se decide por realizzar el requisito **HTTPS**, cumpliendo con cada requisito :white_check_mark:

## Nombre Dominio :rocket:

**Acceso al dominio:** [TicketServer](https://www.legitcities.ml/)

Para ver los eventos del broker se debe acceder a  `/events`, por default se mostarán 25 mensajes. Para ver más mensajes, se debe realizar un **queryParam** de la siguiente manera
`/events?page=<número página>&size=<número de cantidad de mensajes a mostrar>`. Por ejemplo: ***https://www.legitcities.ml/events?page=1&size=25***

## Método de acceso al servidor 

```

    ssh -i "ArquiSoftware.pem" ubuntu@ec2-54-236-50-245.compute-1.amazonaws.com

```


# 2023-1 / IIC2173 - E0 | Ticket Seller

***Fecha de entrega:** 02/04/2023 - 3 Semanas*

## Introduccion al proyecto del curso 

A nivel general el proyecto del curso busca dar a los alumnos una experiencia práctica del desarrollo de un sistema de software compuesto de diferentes componentes. Dicho sistema será desarrollado en grupos y la idea es que este desarrollo sea lo más parecido a un sistema real posible. Así el proyecto abarca temáticas como protocolos, integraciones, seguridad, deployment, entre otros. El proyecto deberá siempre correr en un entorno Cloud para obtener los conocimientos prácticos del desarrollo y *deployment* de software en la nube.

## Enunciado 

Muchos conocemos la experiencia de comprar una entrada por internet. Ya sea a un concierto, evento, *discoteque* u otro. Para ello existen empresas que disponibilizan aplicaciones web para poder comprar entradas como [Passline](https://www.passline.com/) o [PuntoTicket](https://www.puntoticket.com/). 

Durante las vaciones usando dichos servicios, con un grupo de estudiantes nos dimos cuenta que las comisiones de estas aplicaciones para comprar una entrada eran costosas ($2000 por una entrada de de $5000 :( ). Por lo mismo nos planteamos ¿Que tan difícil puede ser hacer una aplicación de este tipo?. ¿Podemos nosotros hacer una aplicación de compra de entradas por nuestra cuenta? Quizá este tipo de aplicaciones parezca sencilla, pero nosotros solo vemos la página. ¿Cuáles son los desafios arquitectónicos de software que soporta dicho sistema?.

Algunos desafíos específicos que presentan dichos sistemas son los siguientes por ejemplo:
- Una gran cantidad de usuarios genera *peaks* de carga al crearse entradas nuevas, en general cuando hay promociones por compra anticipada como preventas.
- Se deben realizar integraciones con métodos de pago como webpay, mach, etc...
- Cómo manejamos el stock de las entradas para que calcen con los otros servicios.

También se repiten problemas de otros software como es el manejo seguro de usuarios, la escalabilidad horizontal del sistema a medida que va creciendo la aplicación, la capacidad de monitorear el sistema para ver datos relevantes, enviar notificaciones a los usuarios etc.

LegitBusiness, una consultora líder del mercado lo ha contratado para introducirse en este campo pues quiere indagar en cómo se pueden construir sistemas de este tipo. Como primera prueba de concepto, le han pedido que se conecte a un broker mqtt de eventos (servidor que acepta mensajes de un cliente y los difunde entre los clientes suscritos, en este caso nosotros enviaremos los mensajes y ustedes deberán suscribirse), que emite eventos de diversos tipos. Estos eventos tienen el siguiente schema JSON y se publican en el canal **events/chile**, en este caso los eventos serán el evento del cual ustedes deberán vender los tickets. 


```
{
   "name": string,
   "date": string (ISO 8601 https://es.wikipedia.org/wiki/ISO_8601),
   "price": number,
   "quantity": number,
   "location": string,
   "latitude": number,
   "longitude" number
},
```

Por ejemplo:

```
{
   "name": "EXPO LONCOCHE 2023  JUEVES 23",
   "date": "2023-01-17T00:00:00",
   "price": 2000,
   "quantity": 10000,
   "location": "PARCELA MUNICIPAL",
   "latitude": -33.455275555427804,
   "longitude": -70.6605295633026
},
```

Debe crear una plataforma que pueda mostrar una lista de estos eventos desde el canal **events/chile**. Tiene la opción de crear un mapa con esta información, para darle más valor.

## Especificaciones

Para esta tarea personal, "Entrega 0", la idea es que todos aprendan la base de una aplicación montada en la web que sea capaz de integrarse a un software externo, por lo que deberán crear y configurar un servicio web que implemente un pequeño servicio que funcione como API.

Pueden desarrollar su solución con el framework que deseen de esta lista:

* Servicio web:
    * Ruby
        * Rails ([Version API](https://guides.rubyonrails.org/api_app.html))
    * Python
        * FastAPI
        * Django 
    * Javascript
        * Koa
        * Express
        * NestJS


* Lenguajes para el servicio de conexión a broker:
    * Ruby
    * Python
    * Javascript
    * Go
    * C#
    * C/C++
    * etc..

**Queda prohibido y no se revisarán aplicaciones hechas en PHP.**

Cada servidor tendrá que tener un dominio asignado. Los dominios TK, ML o GA son gratuitos, y pueden conseguirlos fácilmente en [Namecheap](https://education.github.com/pack/offers#namecheap) utilizando el github student pack, pueden usar otro proovedor de dominio si estiman conveniente. Finalmente, en el servidor deberán configurar un servicio proxy inverso con [NGINX](https://docs.nginx.com/) que esté escuchando en el puerto 443, asegurado con SSL.

Para esto, podrán usar [Let's Encrypt](https://letsencrypt.org/es/) con [certbot](https://certbot.eff.org/), un servicio gratuito de implementación de HTTPS

Finalmente, solo pueden usar los siguientes proveedores en la nube, y sus servicios IaaS:

* AWS

**Los ayudantes podrán responder sus dudas en AWS.** Además, las ayudantías se referirán a AWS. Las siguientes herramientas / plataformas están prohibidas y **no se corregirá nada que ocupe estos servicios:**

* Heroku
* Ciertos servicios de AWS
    * LightSail
    * Elastic Beanstalk
    * Amplify
    * Cognito (para esta entrega)
* Netlify
* Firebase (excepto para notificaciones móviles)

Y cualquier BaaS que implemente funcionalidad fuera de su código. 

En caso de que no tengan tantos conocimientos de desarrollo web recomendamos que usen stacks tecnológicos que ya conozcan o que sean usados en las ayudantías. Por otro lado si quieren indagar en nuevos stacks tecnológicos pueden usar el proyecto del curso para explorar nuevas tecnologías. Recuerden que luego el proyecto se vuelve grupal asi que vean igual con sus compañeros que es lo que más les acomoda para que puedan reutilzar la mayor cantidad de código posible. Recuerden que **no hay mejores tecnologías sino que algunas son más adecuadas para algunos contextos o tareas**.

## Puntaje

Esta entrega consiste en dos partes, la parte mínima (que todos deben lograr) que vale 75% de la nota final y una parte variable que también vale 25%. Sobre la parte variable, tendrán 2 opciones para trabajar, de las que deberán escoger 2. Cada una de las que escojan para evaluar vale 12.5% de la nota final, y realizar una tercera parte puede dar hasta 5 décimas.

Los requisitos marcados como ***Esencial*** son obligatorios para que su tarea sea revisadas, esto pues o son fundamentales para el aprendizaje, o son necesarios para las siguientes entregas del proyecto. De no cumplir con estos, su tarea no será revisada.

### Requisitos funcionales (10p)

* **RF1: (5p)** ***Esencial*** Debe poder ofrecer en una API la lista de eventos que se han generado en el broker a medida que se vayan recibiendo. Esta lista debe ser accedida a través de HTTP en la URI que ustedes estimen conveniente, por ejemplo: *<url>/events*.
* **RF2: (5p)** ***Esencial*** La lista de eventos debe estar paginada para que muestre cada 25 eventos y poder cambiar de pagina cambiando un *queryParam*. Por ejemplo: *<url>/events?page=2&count=25*.
    
*Nota: es importante que sea paginada pues el emisor de eventos enviará miles de eventos durante el desarrollo y corrección de sus proyectos, por lo que si hacen una consulta a la base de datos para que traiga todos los eventos recibidos es probable que se caigan sus entregas.*

### Requisitos no funcionales (20p)

* **RNF1: (5p)** ***Esencial*** Debe poder conectarse al broker mediante el protocolo MQTT usando un proceso que corra de forma constante e independiente de la aplicación web, los eventos recibidos deben ser persistidos con su sistema para que estos puedan ser mostrados (existen diferentes opciones). Para esto debe usar las credenciales dentro del repositorio.
* **RNF1: (3p)** Debe haber un proxy inverso apuntando a su aplicación web (como Nginx o Traefik). *Todo lo que es Nginx es mejor configurarlo directamente en la instancia EC2 y no necesariamente con Docker.*
* **RNF2: (2p)** El servidor debe tener un nombre de dominio de primer nivel (tech, me, tk, ml, ga, com, cl, etc)
* **RNF3: (2p)** ***Esencial*** El servidor debe estar corriendo en EC2.
* **RNF4: (4p)** Debe haber una base de datos Postgres o Mongo externa asociada a la aplicación para guardar eventos y consultarlos. **Pueden usar Postgis por un bonus de 2 decimas.**
* **RNF5: (4p)** ***Esencial*** El servicio (API Web) debe estar dentro de un container Docker.

#### Docker-Compose (15p)

Componer servicios es esencial para obtener entornos de prueba confiables, especialmente en las máquinas de los desarrolladores. Además esta herramienta será necesaria durante el resto del desarrollo del proyecto para orquestar sus contenedores y servicios.

* **RNF1: (5p)** Lanzar su app web desde docker compose
* **RNF2: (5p)** Integrar db desde docker compose (Es decir la base de datos es un contenedor.
* **RNF3: (5p)** Lanzar su receptor mqtt desde docker compose y conectarlo con un volumen a la app web (o base de datos si lo usara)

## Variable
    
Deben elegir al menos uno de los dos grupos de requisitos siguientes.
    
#### HTTPS (25%) (15p)

La seguridad es esencial para sus usuarios, por ello los datos que viajan en su aplicación web deben encriptarse con los protocolos correspondientes.

* **RNF1: (7p)** El dominio debe estar asegurado por SSL con Let’s Encrypt.
* **RNF2: (3p)** Debe poder redireccionar HTTP a HTTPS.
* **RNF3: (5p)** Se debe ejecutar el chequeo de expiración del certificado SSL de forma automática 2 veces al día (solo se actualiza realmente si está llegando a la fecha de expiración).

Algunos software de terceros requieren que sus aplicaciones funcionen con HTTPs, por lo que sin esta capa de seguridad no se puede integrar a dichos servicios. En futuras entregas será necesario tener implementado HTTPs por lo antes mencionado, por lo que si lo logran mejor!.

#### Balanceo de Carga con Nginx (25%) (15p)

Para escalar el servicio de forma horizontal podemos replicar el contenedor de la aplicación web y utilizar NGINX como balanceador de carga, así podemos crear tantos servidores como nuestro servicio necesite. Esto es altamente necesario para aplicaciones que en ciertos momentos tendrán una carga importante y en otros no.

* **RF1: (5p)** Debe replicar al menos 2 contenedores de su aplicación web para que corran en paralelo.
* **RF2: (10p)** Debe configurar Nginx para que haga un balanceo de carga hacia los servidores levantados (Pueden encontrar la configuración en la documentación de nginx).

## Recomendaciones

* Lo más importante no es que la aplicación esté funcionando al 100%, sino que el servidor exista y se pueda acceder a la aplicación correctamente. 
* Para esta entrega basta con que se pueda llevar a cabo las funcionalidades solicitadas manteniendo el estandar de una API. Fíjense en la proporcion entre RNF y RF. No será necesario hacer una interfaz visual.

### Roadmap sugerido

Para simplificar esta primera entrega, le sugerimos seguir los siguientes pasos

* Ejecute pruebas de concepto para conectarse al cliente MQTT
* Levante un servidor web que pueda leer los eventos recibidos.
* Ponga su servicio en un container Docker
* Levante una máquina en AWS EC2 y abra los puertos
* Instale docker en la máquina
* Copie su aplicacion y construya el container
* Corra su servicio y termine su configuración
* Todo lo que es Nginx es mejor configurarlo directamente en la instancia EC2

**Recuerden que la entrega debe estar corriendo en el EC2 en cloud, no se corregirán entregas locales, por lo que avancen incrementalmente en el cloud.** Recuerden, funcionalidad que no esta en producción no está realmente terminada, **no subestimen la dificultad del deployment**, pues es mucho más manual que en otros cursos como ingeniería de software o desarrollo web.

A continuación se muestra a modo de guía un diagrama UML de componentes una posible solución de la entrega 

![](https://i.imgur.com/wQ7WAEP.png)

En caso de que se implemente el bonus de NGINX con balanceador de carga se tienen multiples *events service* pues están replicados, el resto se mantiene constante.

## Entrega

Se les proporcionará un repositorio de Github Classroom donde pueden subir su código e ir registrando sus commits. 

Deben subir el código de su solución junto al archivo de configuración de Nginx (o Traefik u otro) en el repositorio que se les asignará vía github classroom.
También deben entregar el archivo .pem asociado al servidor EC2 para tener los respectivos accesos y poder realizar una buena corrección.
Además, para poder facilitar la corrección deben generar un README.md que señale:

* Consideraciones generales
* Nombre del dominio
* Método de acceso al servidor con archivo .pem y ssh (no publicar estas credenciales en el repositorio).
* Puntos logrados o no logrados y comentarios si son necesarios para cada aspecto a evaluar en la Parte mínima y en la Parte variable.
* De realizar un tercer requisito variable también explicitar en el readme.

Pueden sobrescribir este README sin problemas o cambiarle el nombre

Además, y como algo muy importante: **ESTÁ ABSOLUTAMENTE PROHIBIDO SUBIR SU ARCHIVO .PEM A SU REPOSITORIO DE GITHUB.** Si hacen esto se les calificará con nota 1. Para esto se les habilitará un buzón de canvas para que nos lo compartan.

Esta entrega es estrictamente individual y será revisada para casos de copia.

## Atraso

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

## Enlaces relevantes

* [Github Student Pack](https://education.github.com/pack)
* [Página AWS](https://aws.amazon.com/es/)
* [Docker - Instalación](https://docs.docker.com/engine/install/ubuntu/)
* https://www.tutorialspoint.com/docker/docker_compose.htm
* https://phoenixnap.com/kb/ssh-to-connect-to-remote-server-linux-or-windows
* https://www.digitalocean.com/community/tags/deployment?type=tutorials
* https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/
* https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04-es
* https://www.freenom.com/es/index.html?lang=es
* [Youtube - Freenom Tutorial](https://www.youtube.com/watch?v=XvyjIG2F-cs)
* https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/
* [Documentación AWS SES](https://docs.aws.amazon.com/ses/latest/dg/Welcome.html)
* [Documentación de OpenStreetMap]( https://wiki.openstreetmap.org/wiki/API_v0.6)
* [MQTT.js tutorial](https://www.emqx.com/en/blog/mqtt-js-tutorial)

## Ayudantías Útiles

* **Ayudantía 1** - Cloud 1: AWS, Linux y EC2 - 10/03/23
* **Ayudantía 2** - Cloud 2: Docker, Docker-Compose y alternativas - 17/03/23
* **Ayudantía 3** - Cloud 3: Deployment básico - 24/03/23

## Apoyo

Pueden usar el Slack del curso en el canal #E0 para dudas más rápidas.
