# REST API (Weblog/blog)

### Universidad de Costa Rica
### Escuela de Ciencias de la Computación e Informática
### CI-0137 Desarrollo de aplicaciones web
### Integrantes: 
#### Tonny Ortiz Salazar B35054
### Profesor: Braulio Solano Rojas


# Requerimientos de software

* MySQL instalado
* Node 18
* npm

# Preparando la base de datos local de pruebas

1- Instale MySQL si ya no lo posee y guarde la contraseña y usuario root.

2- instale sequelize-cli
```
npm install sequelize-cli -g
```

3-Puede cambiar el nombre de la database dentro del archivo /config/config.json.  Las credenciales para ser accesada tambien deben estar correctamente configuradas en ese mismo archivo.

4- Cree la base de datos 
```
sequelize db:create
```

5- Genere las tablas dentro de la base de datos
```
sequelize db:migrate
```

# Ejecutando el app

1- Para desarrollo corra el siguiente comando:
```
npm run dev
```
Esto le permitirá hacer cambios en el código que se reflejaran en el app cada vez que guarde, sin necesidad de volver a correr ningún comando adicional.

2- Para correrlo en producción de manera normal use este otro comando:
```
npm run start
```

# Desarrollo

1- Cuando desee comenzar a trabajar con scss se deben correr 2 terminales. Una para el compilado de scss a css y otra para correr el app.

```
// Terminal 1: Compilar scss
gulp default

// Terminal 2: Correr el proyecto con cambios en vivo
npm run dev
```

# Estructura del proyecto

### /bin/www 
Contiene el archivo main o inicial donde se ejecuta el server

### /config/
Contiene los archivos de configuración tanto del server como del app para que pueda hacer cambios rápidos que se verán reflejados en la ejecución del app.

### /migrations/
Contiene los archivos que definen las tablas necesarias dentro de la base de datos
