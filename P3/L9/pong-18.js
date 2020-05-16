console.log("Ejecutando JS...");

//-- Obtener el objeto canvas
const canvas = document.getElementById("canvas");

//-- Sus dimensiones las hemos fijado en el fichero
//-- HTML. Las imprimimos en la consola
console.log(`canvas: Anchura: ${canvas.width}, Altura: ${canvas.height}`);

//-- Obtenemos el contexto 2D para el canvas.
const ctx = canvas.getContext("2d");

//-- Cargamos los sonidos que va a tener el juego
const sonido_raqueta = new Audio("pong-raqueta.mp3");
const sonido_rebote = new Audio("pong-rebote.mp3");

// -- Funcion que pinta todos los objetos en el canvas
function draw() {
  //-- Dibujar la Bola
  bola.draw();

  //-- Dibujar raquetas
  raqI.draw();
  raqD.draw();

  //-- Dibujamos la red
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

}
//-- Dibujamos el tanteo
var Contador1 = 0;
var Contador2 = 0;
function drawScore(){
  ctx.font = "80px fantasy";
  ctx.fillStyle = "#white";
  ctx.fillText(+Contador1, 200, 80);
  ctx.fillText(+Contador2, 340, 80);
}

//-- Bucle principal de la animación.
function animacion() {
  //-- Actualizar las posiciones de los objetos móviles

  //-- Comprobar si la bola ha alcanzado los límites.
  //-- Si es así, se cambia de signo la velocidad, para
  // que "rebote" y vaya en el sentido opuesto
  if (bola.x >= canvas.width) {
    //-- Hay colisión. Cambiar el signo de la bola
    bola.vx = bola.vx * -1;
    //-- Reproducir sonido.
    sonido_rebote.currentTime = 0;
    sonido_rebote.play();
    //-- Aumentar marcador.
    Contador1++;
  }else if(bola.x <= 0.0){
    bola.vx = bola.vx * -1; //-- Hay colisión. Como el signo de la bola era negativo
                            //-- volvemos a multiplicar por -1 para que vuelva a ser positivo.
    //-- Reproducir sonido.
    sonido_rebote.currentTime = 0;
    sonido_rebote.play();
    //-- Aumentar marcador.
    Contador2++;
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

  //-- Actualizar la coordenada x de la bola, en función
  //-- de su velocidad.
  bola.update();

  //-- Actualizar las coordenadas de la raqueta.
  raqI.update();
  raqD.update();

  //-- Borrar el canvas. Argumentos: esquina superior izquierda, altura, anchura.
  //-- Lo borramos por completo.
  ctx.clearRect(0,0, canvas.width, canvas.height);

  //-- Dibujar el nuevo frame
  draw();
  drawScore();

  //-- Mostrar actividad en la consola
  console.log("Frame!");
}

//-- Inicializa la bola a su posición inicial.
const bola = new Bola(ctx);
bola.init();

//-- Crear las raquetas.
const raqI = new Raqueta(ctx);
const raqD = new Raqueta(ctx);

//-- Inicializar la raqueta a su posición inicial.
raqI.init();

//-- Cambiar las coordenadas de la raqueta derecha.
raqD.x_ini = 540;
raqD.y_ini = 300;
raqD.init();

//-- Arrancar la animacion. Esta funcion llama periodicamente a la Funcion
//-- animacion() con una frecuencia de 60Hz
//-- Arrancar la animación
setInterval(()=>{
  animacion();
},16);

//-- Retrollamada de las teclas
window.onkeydown = (e) =>{
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
      //-- Reproducir sonido.
      sonido_raqueta.currentTime = 0;
      sonido_raqueta.play();
      //-- Llevar bola a su posición inicial.
      bola.init();
      //-- Llevar la bola a su posición inicial.
      bola.vx = bola.vx_ini;
      bola.vy = bola.vy_ini;
    default:
  }
}

//-- Retrollamada de la liberación de teclas.
window.onkeyup = (e) =>{
  if(e.key == "a" || e.key == "q"){
    //-- Quitar la velocidad de la raqueta izquierda.
    raqI.v = 0;
  }

  if (e.key == "p" || e.key == "l") {
    raqD.v = 0;
  }
}
