//Declaració d'objecte puntuació
const Puntuacio = {
    numbers: {
        puntuacioActual: [0, 0], // Puntuación actual de cada jugador
        totalPartides: [0, 0],  // Total partidas jugadas por cada jugador
        partidesGuanyades: [0, 0], // Partidas ganadas por cada jugador
    },
    //Fucio per controlar el camp de puntuació de cada jugador param jugador reb 0 o 1 i modifica el camp puntuacióActual 
    incrementarPunts(jugador, punts) {
        this.numbers.puntuacioActual[jugador] += punts;
        if (this.numbers.puntuacioActual[jugador] < 0) {
            this.numbers.puntuacioActual[jugador] = 0; // Asegurar que no haya puntos negativos
        }
    },

    registrarPartida(jugador, guanyat) {
        this.numbers.totalPartides[jugador]++; // Sumar total de partidas jugadas
        if (guanyat) {
            this.numbers.partidesGuanyades[jugador]++; // Sumar partidas ganadas si el jugador ganó
        }
        // Comparar la puntuación actual con la mejor puntuación
        if (!this.numbers.millorPuntuacio) {
            this.numbers.millorPuntuacio = [0, 0]; // Inicializar si no existe
        }
        if (this.numbers.puntuacioActual[jugador] > this.numbers.millorPuntuacio[jugador]) {
            this.numbers.millorPuntuacio[jugador] = this.numbers.puntuacioActual[jugador];
        }
        // Reiniciar la puntuación actual para la próxima partida
        this.numbers.puntuacioActual[jugador] = 0;
    },
};



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
    generarBotons();
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
    obj.disabled = true; // Deshabilitar el botón
    obj.classList.add('disabled'); // Añadir la clase para diferenciar el botón deshabilitado
    let aparicions = 0;

    // Verificar si la letra está en la palabra secreta
    if (paraulaSecreta.includes(lletraJugada)) {
        for (let i = 0; i < paraulaSecreta.length; i++) {
            if (paraulaSecreta[i] === lletraJugada && paraulaActual[i] === '_') {
                paraulaActual[i] = lletraJugada;
                aparicions++;
            }
        }
        Puntuacio.incrementarPunts(jugadorActual - 1, aparicions); // Añadir puntos por las apariciones
        mostrarParaula(); // Mostrar la palabra con las letras acertadas
    } else {
        Puntuacio.incrementarPunts(jugadorActual - 1, -1); // Restar un punto por fallar
        contadorErrors++;
        document.getElementById("img").src = `Imatges/penjat_${contadorErrors}.jpg`;
        canviarTorn(); // Cambiar el turno al otro jugador
    }

    // Verificar si la partida termina (por ganar o perder)
    if (contadorErrors >= 10 || !paraulaActual.includes('_')) {
        finalitzarPartida(paraulaActual.includes('_') ? true : false);
    } else {
        actualitzarUIJugador(); // Actualizar la interfaz solo si no termina la partida
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
    // Registrar la partida del jugador actual
    Puntuacio.registrarPartida(jugadorActual - 1, guanyat);

    // Si el otro jugador también participó (en el caso de partidas multijugador), registrar su partida
    if (contadorErrors >= 10 && !guanyat) {
        const otroJugador = jugadorActual === 1 ? 2 : 1;
        Puntuacio.registrarPartida(otroJugador - 1, false); // El otro jugador pierde
    }

    actualitzarUIJugador(); // Actualizar la interfaz después de registrar
    reiniciarJoc(); // Reiniciar la partida
}

function reiniciarJoc() {
    entrada.disabled = false;
    botoComençar.disabled = false;
    paraulaActual = [];
    contadorErrors = 0;
    puntuacions = [0, 0];
    habilitarBotons();
    document.getElementById('img').src = 'Imatges/penjat_0.jpg';
    document.getElementById('resposta').textContent = 'Comença la partida';
    actualitzarUIJugador();
}

function actualitzarUIJugador() {
    // Actualizar la información para Jugador 1
    let jugador1Div = document.getElementById('turnJugador1').querySelectorAll('p');
    jugador1Div[1].textContent = Puntuacio.numbers.puntuacioActual[0]; // Puntos partida actual Jugador 1
    jugador1Div[3].textContent = Puntuacio.numbers.totalPartides[0]; // Total partidas Jugador 1
    jugador1Div[5].textContent = Puntuacio.numbers.partidesGuanyades[0]; // Partidas ganadas Jugador 1
    jugador1Div[7].textContent = Puntuacio.numbers.millorPuntuacio ? Puntuacio.numbers.millorPuntuacio[0] : 0; // Mejor puntuación Jugador 1

    // Actualizar la información para Jugador 2
    let jugador2Div = document.getElementById('turnJugador2').querySelectorAll('p');
    jugador2Div[1].textContent = Puntuacio.numbers.puntuacioActual[1]; // Puntos partida actual Jugador 2
    jugador2Div[3].textContent = Puntuacio.numbers.totalPartides[1]; // Total partidas Jugador 2
    jugador2Div[5].textContent = Puntuacio.numbers.partidesGuanyades[1]; // Partidas ganadas Jugador 2
    jugador2Div[7].textContent = Puntuacio.numbers.millorPuntuacio ? Puntuacio.numbers.millorPuntuacio[1] : 0; // Mejor puntuación Jugador 2
}

function iconOjo() {
    if (entrada.type === "password") {
        entrada.type = "text";
    } else {
        entrada.type = "password";
    }
}


function generarBotons() {
    const contenedorBotones = document.querySelector('.Buttons');
    contenedorBotones.innerHTML = ''; // Limpiar botones anteriores, si los hubiera

    // Crear botones para cada letra (A-Z)
    for (let i = 0; i < 26; i++) {
        const boton = document.createElement('button');
        boton.textContent = String.fromCharCode(65 + i); // Letras A-Z
        boton.classList.add('boton-letra'); // Clase para los estilos
        boton.addEventListener('click', () => jugarLletra(boton)); // Asignar evento al botón
        contenedorBotones.appendChild(boton); // Añadir botón al contenedor
    }
}

const habilitarBotons = () => {
    document.querySelectorAll('.boton-letra').forEach(boton => {
        boton.disabled = false; // Habilitar el botón
        boton.classList.remove('disabled'); // Remover la clase de deshabilitado si existe
    });
};

const deshabilitarBotons = () => {
    document.querySelectorAll('.boton-letra').forEach(boton => {
        boton.disabled = true; // Deshabilitar el botón
        boton.classList.add('disabled'); // Añadir una clase para indicar que está deshabilitado
    });
};