# MUTANT DNA
## Proyecto Base
### Instalación
MUTANT DNA requiere [Node.js](https://nodejs.org/) y NPM

 Instalar las dependencias
```sh
$ cd mutantDna
$ npm install -d
```
### Ejecución
El programa solo admite como valor de entrada un array de strings, de manera tal que forme una matriz de NxN elementos.
Ejecutarlo llamando a app.js
```sh
$ node app.js [ARGUMENTOS]
```
Ejemplo:
```sh
$ node app.js "ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"
```
El programa devolverá si el ADN ingresado corresponde a un Mutante o no
```sh
DNA:  [ 'ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG' ]
Is Mutant:  true
```
Si los valores ingresados no son válidos, el programa devolverá un error.
```sh
$  node app.js 123
Error: Estructura inválida, solo se aceptan matrices cuadradas
```

### Test Unitarios
Dentro del archivo `mutantDna.test.js` se encuentran algunos tests unitarios que prueban la funcionalidad del programa, dentro del mismo se pueden agregar los que sean necesarios

Para ejecutar dichos tests, en una consola:
```sh
$  npm run test
```

## Proyecto en Google Firebase

![alt text](https://drive.google.com/file/d/1pQkhL0RAoCCfPwFuDvzSbcYNM_4wGum2/view?usp=sharing)
