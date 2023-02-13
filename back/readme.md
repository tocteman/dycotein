# back

### Backend del directorio; Feathers.js + MySQL

Aunque en un principio me propuse codificar el proyecto línea por línea, obtuve tantos errores con los que no estaba familiarizado que opté por usar los generadores del CLI. En realidad no hice mucho más que generar los servicios, cambiar un par de _resolvers_ y cambiar los esquemas y migraciones. 

Ahora bien, ese camino del error sí me dio una idea más o menos clara sobre cómo funciona el framework: Modelos y Controladores pasan a ser Servicios y Gatillos; en un principio no hay necesidad de declarar ni rutas ni métodos. En general me gustó bastante; sé que habrá bastante por aprender.

La base de datos está alojada en Digital Ocean y debe ser declarada en un archivo **.env** de esta forma:
```
DATABASE_URL=mysql://TODO_EL_CONNECTION_STRING
```

El servidor, por su parte, está alojado en [Fly](https://fly.io).
