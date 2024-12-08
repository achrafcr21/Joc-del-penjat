# Joc-del-penjat

Refactorización: Centralizada la lógica de puntuación en el objeto `Puntuacio`

- Se ha creado el objeto `Puntuacio` para manejar puntuaciones, total de partidas y partidas ganadas.
- Añadido el método `registrarPartida` al objeto para simplificar la gestión de resultados.
- La función `finalitzarPartida` ahora utiliza `Puntuacio` para registrar partidas.




## fer el fetch:
const url("aqui posem la url del archiu como per exemple 127.0.0.1:5000/users")


fetch(url)   aqui toca fer el .then (en aquesta part rebem la promisa "pending" y si tot be returna fullfilled, quan fem el .then ja pasame a rebre un altre promisa lo que implica a incluir un parametre on rebrem el value y seria aixi:)

fetch(url)
.then (function(response))  aqui ya rebem la segona promisa en la variable dada1, y hem de fer response.then y ara toca el segon .then per rebre el el value d'aquesta promisa :

.then(function (dada2))

aqui ja podem returnar aquest objecte (dada2) y ja tendrem el value on es troba la dada