// Declaració de variables
// Declaración de variables
const entrada = document.getElementById("object");
const botoComençar = document.getElementById("comenzarPartida");
let paraulaSecreta = "";
let paraulaActual = [];
let contadorErrors = 0;
let jugadorActual = 1;
let puntuacions = [0, 0];
let totalPartides = [0, 0];
let partidesGuanyades = [0, 0];
let millorPuntuacio = [0, 0];

function comenzarPartida() {
    paraulaSecreta = entrada.value.toUpperCase().trim();
    if (!paraulaSecreta) {
        alert("Has d'introduir una paraula per començar");
        return;
    }
    if (/\d/.test(paraulaSecreta)) {
        alert("La paraula no pot contenir números");
        return;
    }
    if (paraulaSecreta.length <= 3) {
        alert("La paraula secreta ha de tenir com a mínim 4 lletres");
        return;
    }
    entrada.disabled = true;
    botoComençar.disabled = true;
    paraulaActual = Array(paraulaSecreta.length).fill('_');
    mostrarParaula();
    actualitzarUIJugador();
    // Cambiar el color del Jugador 2 a rojo
    document.getElementById('turnJugador2').style.backgroundColor = 'red';
    // Cambiar el color del Jugador 1 a verde
    document.getElementById('turnJugador1').style.backgroundColor = 'green';
}

function mostrarParaula() {
    document.getElementById('resposta').textContent = paraulaActual.join('');
}

function jugarLletra(obj) {
    const lletraJugada = obj.textContent;
    obj.disabled = true;
    let haAdivinat = false;
    let aparicions = 0;

    if (paraulaSecreta.includes(lletraJugada)) {
        haAdivinat = true;
        for (let i = 0; i < paraulaSecreta.length; i++) {
            if (paraulaSecreta[i] === lletraJugada && paraulaActual[i] === '_') {
                paraulaActual[i] = lletraJugada;
                aparicions++;
            }
        }
        puntuacions[jugadorActual - 1] += aparicions;
        mostrarParaula();
        actualitzarUIJugador();
    } else {
        contadorErrors++;
        document.getElementById("img").src = `Imatges/penjat_${contadorErrors}.jpg`;
        canviarTorn();
    }

    if (contadorErrors >= 10 || !paraulaActual.includes('_')) {
        finalitzarPartida(paraulaActual.includes('_') ? false : true);
    }
}

function canviarTorn() {
    if (jugadorActual === 1) {
        jugadorActual = 2;
        // Cambiar el color del Jugador 1 a rojo
        document.getElementById('turnJugador1').style.backgroundColor = 'red';
        // Cambiar el color del Jugador 2 a verde
        document.getElementById('turnJugador2').style.backgroundColor = 'green';
    } else {
        jugadorActual = 1;
        // Cambiar el color del Jugador 2 a rojo
        document.getElementById('turnJugador2').style.backgroundColor = 'red';
        // Cambiar el color del Jugador 1 a verde
        document.getElementById('turnJugador1').style.backgroundColor = 'green';
    }
}

function finalitzarPartida(guanyat) {
    totalPartides[jugadorActual - 1]++;
    if (guanyat) {
        partidesGuanyades[jugadorActual - 1]++;
        if (puntuacions[jugadorActual - 1] > millorPuntuacio[jugadorActual - 1]) {
            millorPuntuacio[jugadorActual - 1] = puntuacions[jugadorActual - 1];
        }
    }
    reiniciarJoc();
}

function reiniciarJoc() {
    entrada.disabled = false;
    botoComençar.disabled = false;
    paraulaActual = [];
    contadorErrors = 0;
    puntuacions = [0, 0];
    document.querySelectorAll('.Buttons button').forEach(boton => boton.disabled = false);
    document.getElementById('img').src = 'Imatges/penjat_0.jpg';
    document.getElementById('resposta').textContent = 'Comença la partida';
    actualitzarUIJugador();
}

function actualitzarUIJugador() {
    // Actualizar la información para Jugador 1
    let jugador1Div = document.getElementById('turnJugador1').querySelectorAll('p');
    jugador1Div[1].textContent = puntuacions[0]; // Puntos partida actual Jugador 1
    jugador1Div[3].textContent = totalPartides[0]; // Total partides Jugador 1
    jugador1Div[5].textContent = partidesGuanyades[0]; // Partides guanyades Jugador 1
    jugador1Div[7].textContent = millorPuntuacio[0]; // Millor puntuació Jugador 1

    // Actualizar la información para Jugador 2
    let jugador2Div = document.getElementById('turnJugador2').querySelectorAll('p');
    jugador2Div[1].textContent = puntuacions[1]; // Puntos partida actual Jugador 2
    jugador2Div[3].textContent = totalPartides[1]; // Total partides Jugador 2
    jugador2Div[5].textContent = partidesGuanyades[1]; // Partides guanyades Jugador 2
    jugador2Div[7].textContent = millorPuntuacio[1]; // Millor puntuació Jugador 2
}

function iconOjo() {
    if (entrada.type === "password") {
        entrada.type = "text";
    } else {
        entrada.type = "password";
    }
}