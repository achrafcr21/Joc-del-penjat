# Joc-del-penjat

Refactorización: Centralizada la lógica de puntuación en el objeto `Puntuacio`

- Se ha creado el objeto `Puntuacio` para manejar puntuaciones, total de partidas y partidas ganadas.
- Añadido el método `registrarPartida` al objeto para simplificar la gestión de resultados.
- La función `finalitzarPartida` ahora utiliza `Puntuacio` para registrar partidas.