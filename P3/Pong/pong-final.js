
console.log("Ejecutando JS...");

//-- Obtener el objeto canvas
const canvas = document.getElementById("canvas");

//-- Sus dimensiones las hemos fijado en el fichero
//-- HTML. Las imprimimos en la consola
console.log(`canvas: Anchura: ${canvas.width}, Altura: ${canvas.height}`);

//-- Obtener el contexto para pintar en el canvas
const ctx = canvas.getContext("2d");

//-- Obtener Sonidos
const sonido_raqueta = new Audio("pong-raqueta.mp3");
const sonido_rebote = new Audio("pong-rebote.mp3");
const sonido_tanto = new Audio("pong-tanto.mp3");
const sonido_ganar = new Audio("pong-ganador.mp3");
const sonido_fondo = new Audio("pong-fondo.mp3");

//-- Estados del juego
const ESTADO = {
  INIT: 0,
  SAQUE: 1,
  JUGANDO: 2,
  GANADOR: 3,
}

//-- Variable de estado
//-- Arrancamos desde el estado inicial
let estado = ESTADO.INIT;

//-- Pintar todos los objetos en el canvas
function draw() {
  //----- Dibujar la Bola
  //-- Solo en el estado de jugando
  if (estado == ESTADO.JUGANDO) {
    bola.draw();
  }

  //-- Dibujar las raquetas
  raqI.draw();
  raqD.draw();

  //--------- Dibujar la red
  ctx.beginPath();

  //-- Estilo de la linea: discontinua
  //-- Trazos de 10 pixeles, y 10 de separacion
  ctx.setLineDash([10, 10]);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;

  //-- Punto superior de la linea. Su coordenada x está en la mitad
  //-- del canvas
  ctx.moveTo(canvas.width/2, 0);

  //-- Dibujar hasta el punto inferior
  ctx.lineTo(canvas.width/2, canvas.height);
  ctx.stroke();

  //-- Dibujar el texto de sacar
  if (estado == ESTADO.SAQUE) {
    ctx.font = "40px Arial";
    ctx.fillStyle = "yellow";
    ctx.fillText("Saca!", 30, 350);
  }

  //-- Dibujar el texto de comenzar
  if (estado == ESTADO.INIT) {
    ctx.font = "40px Arial";
    ctx.fillStyle = "#21E506";
    ctx.fillText("Pulsa Start!", 30, 350);
  }

  //-- Dibujar texto cuando uno de los jugadores gane.
  if (estado == ESTADO.GANADOR) {
    if (Contador1 == 3) {
      ctx.font = "40px Arial";
      ctx.fillStyle = "red";
      ctx.fillText("PLAYER 1 WIN!", 30, 350);
    }
    if (Contador2 == 3) {
      ctx.font = "40px Arial";
      ctx.fillStyle = "red";
      ctx.fillText("PLAYER 2 WIN!", 30, 350);
    }
  }
}

//-- Dibujar el tanteo
var Contador1 = 0;
var Contador2 = 0;
function drawScore(){
  ctx.font = "80px fantasy";
  ctx.fillStyle = "#white";
  ctx.fillText(Contador1, 200, 80);
  ctx.fillText(Contador2, 340, 80);
}

//---- Bucle principal de la animación
function animacion() {
  //-- Actualizar las posiciones de los objetos móviles
  //-- Actualizar la raqueta con la velocidad actual
  raqI.update();
  raqD.update();

  //-- Comprobar si la bola ha alcanzado el límite derecho
  //-- Si es así, se cambia de signo la velocidad, para
  // que "rebote" y vaya en el sentido opuesto
  if (bola.x >= canvas.width) {
    //-- Hay colisión. Cambiar el signo de la bola
    bola.vx = bola.vx * -1;
    //-- Reproducir sonido.
    sonido_rebote.currentTime = 0;
    sonido_rebote.play();
  }else if(bola.x <= 0.0){ //-- Comprobar si la bola ha alcanzado el límite izquierdo.
    bola.vx = bola.vx * -1; //-- Hay colisión. Como el signo de la bola era negativo
                            //-- volvemos a multiplicar por -1 para que vuelva a ser positivo.
    //-- Reproducir sonido.
    sonido_rebote.currentTime = 0;
    sonido_rebote.play();
  }else if (bola.y >= canvas.height) {
    bola.vy = bola.vy * -1;
    //-- Reproducir sonido.
    sonido_rebote.currentTime = 0;
    sonido_rebote.play();
  }else if (bola.y <= 0.0) {
    bola.vy = bola.vy * -1;
    //-- Reproducir sonido.
    sonido_rebote.currentTime = 0;
    sonido_rebote.play();
  }

  //-- Si llega al límite izquierdo, hemos perdido
  //-- pasamos al estado de SAQUE
  if (bola.x <= bola.size) {
    estado = ESTADO.SAQUE;
    bola.init();
    console.log("Tanto!!!!");
    Contador2++;
    sonido_tanto.play();
    console.log(Contador2);
    if (Contador2 == 3) {
      estado = ESTADO.GANADOR;
      sonido_ganar.play();
    }
  }

  //-- Si llega al límite derecho, hemos perdido
  //-- pasamos al estado de SAQUE
  if (bola.x >= canvas.width) {
    estado = ESTADO.SAQUE;
    bola.init();
    console.log("Tanto!!!!");
    Contador1++;
    sonido_tanto.play();
    console.log(Contador1);
    if (Contador1 == 3) {
      estado = ESTADO.GANADOR;
      sonido_ganar.play();
    }
  }

  //-- Comprobar si hay colisión con la raqueta izquierda
  if (bola.x >= raqI.x && bola.x <=(raqI.x + raqI.width) &&
    bola.y >= raqI.y && bola.y <=(raqI.y + raqI.height)) {
      bola.vx = bola.vx * -1;
      //-- Reproducir sonido.
      sonido_raqueta.currentTime = 0;
      sonido_raqueta.play();
  }

  //-- Comprobar si hay colisión con la raqueta derecha
  if (bola.x >= raqD.x && bola.x <=(raqD.x + raqD.width) &&
    bola.y >= raqD.y && bola.y <=(raqD.y + raqD.height)) {
      bola.vx = bola.vx * -1;
      //-- Reproducir sonido.
      sonido_raqueta.currentTime = 0;
      sonido_raqueta.play();
  }

  //-- Actualizar coordenada x de la bola, en funcion de
  //-- su velocidad
  bola.update()

  //-- Borrar la pantalla
  ctx.clearRect(0,0, canvas.width, canvas.height);

  drawScore();
  draw();

  window.requestAnimationFrame(animacion);

}

//-- Inicializa la bola: Llevarla a su posicion inicial
const bola = new Bola(ctx);

//-- Crear las raquetas
const raqI = new Raqueta(ctx);
const raqD = new Raqueta(ctx);

//-- Inicializar la raqueta a su posición inicial.
raqI.init();

//-- Cambiar las coordenadas de la raqueta derecha
raqD.x_ini = 540;
raqD.y_ini = 300;
raqD.init();

animacion();

//-- Retrollamada de las teclas
window.onkeydown = (e) => {
//-- En el estado inicial no se
//-- hace caso de las teclas
if (estado == ESTADO.INIT)
  return;

  //-- Según la tecla se hace una cosa u otra.
  switch (e.key) {
    //-- Tecla a: baja la raqueta izquierda.
    case "a":
      raqI.v = raqI.v_ini;
      break;
    //-- Tecla q: sube la raqueta izquierda.
    case "q":
      raqI.v = raqI.v_ini * -1;
      break;
    case "p":
      raqD.v = raqD.v_ini * -1;
      break;
    case "l":
      raqD.v = raqD.v_ini;
      break;
    //-- Tecla ESPACIO: Saque.
    case " ":
    //-- El saque solo funciona en el estado de SAQUE
    if (estado == ESTADO.SAQUE) {
      //-- Reproducir sonido
      sonido_raqueta.currentTime = 0;
      sonido_raqueta.play();
      //-- Llevar bola a su posicion incicial
      bola.init();
      //-- Darle velocidad
      bola.vx = bola.vx_ini;
      bola.vy = bola.vy_ini;
      //-- Cambiar al estado de jugando!
      estado = ESTADO.JUGANDO;
      return false;
    }
    default:
  }
}

window.onkeyup = (e) => {
  if (e.key == "a" || e.key == "q"){
    //-- Quitar velocidad de la raqueta
    raqI.v = 0;
  }
  if (e.key == "p" || e.key == "l") {
    raqD.v = 0;
  }
}

//-- Botón de arranque
const start = document.getElementById("start");
start.onclick = () => {
  sonido_fondo.play();
  estado = ESTADO.SAQUE;
  console.log("SAQUE!");
  canvas.focus();
}

//-- Boton de stop
const reset = document.getElementById("reset");
reset.onclick = () => {
  //-- Volver al estado inicial
  estado = ESTADO.INIT;
  Contador1 = 0;
  Contador2 = 0;
  bola.init();
  start.disabled = false;
}
