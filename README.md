Autor: Martín González - 2020

# Aplicación Smart HOME

## Introducción

El objeto de este proyecto es finalizar la asignatura Desarrollo de Aplicaciones Web de la CEIoT.

La aplicación consiste en una SPA (Single Page Aplicaction) que simula la autmatización del  accionamiento de elementos domésticos (Lámparas y Persianas).

![Aplicacion Smart HOME](/doc/app.jpg?raw=true "Smart HOME")

## Herramientas utilizadas

El proyecto se encuentra desarrollado con las siguientes herramientas:

1. Framework CSS: [Materialize](https://materializecss.com/)
2. Front-end: [TypeScript](https://www.typescriptlang.org/)
3. Back-end: [Node.js](https://nodejs.org/en/) + [Express.js](https://expressjs.com/)
4. Persistencia de datos: [MySQL](https://www.mysql.com/)

Los servicios requeridos Node.js y MySQL para la ejecución, asi como el compilador TypeScript en caso de requerir modificar el código del Front-end, se corren desde contenedores Docker.

## Prerequisitos

La aplicación requiere contar con Docker Engine instalado.

En el link https://docs.docker.com/engine/install/ubuntu/ se muestran los pasos para la intalación de Docker Engie en las ultimas versiones de Ubuntu.

## Correr la aplicación

Clonar o descargar la aplicacion desde Git Hub.

```sh
git clone https://github.com/mgonzalez738/daw_tp_final.git
```

El primer paso será detener todos los contenedores corriendo en la máquina.
```sh
docker stop $(docker ps -a -q)
```

El siguiente paso será chequear la red de Docker que se utilizará para conectar los contenedores entre sí con el siguiente comando.
```sh
docker network ls | grep mysql-net
```
Si el comando anterior no arroja info, será necesario crearla con el siguiente comando.
```sh
docker network create --driver bridge mysql-net
```

Con la red creada será necesario ejecutar el contenedor con la base de datos. Para eso, dentro del directorio raíz del proyecto ejecutar el siguiente comando, pasándole como argumento la red a utilizar y el directorio donde se encuentra la base de datos.
```sh
./start_mysql.sh mysql-net "$PWD"/db
```

A continuación correr el gestor de base de datos PHPMyAdmin con el siguiente comando, especificando la red de Docker, el nombre del servidor de base de datos y el puerto.
```sh
./run_phpadmin.sh mysql-net mysql-server 8085
```
Chequear que PHPMyAdmin está funcionando en http://localhost:8085.

Finalmente ejecutar el servidor de NodeJS con la aplicación creada hasta el momento pasando como argumento el directorio actual, especificando que el entry point de la aplicación será ws/index.js, corriendo la aplicación en el puerto localhost 8000 y sobre la red mysql-net, donde se encuentran la base de datos y el administrador de la base de datos.
```sh
./serve_node_app_net.sh "$PWD" ws/index.js 8000 mysql-net
```
Chequear que la aplicación esté corriendo en http://localhost:8000.

## Contribuir
Para contribuir realizar un pull request con las sugerencias.

