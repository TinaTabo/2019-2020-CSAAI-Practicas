console.log("Ejecutando JS...");

//-- Obtener el objeto canvas
const canvas = document.getElementById("canvas");

//-- Sus dimensiones las hemos fijado en el fichero
//-- HTML. Las imprimimos en la consola
console.log(`canvas: Anchura: ${canvas.width}, Altura: ${canvas.height}`);

//-- Obtenemos el contexto 2D para el canvas.
const ctx = canvas.getContext("2d");

//-- Cargamos los sonidos que va a tener el juego
var sound1 = new Audio('sound1.ogg');

//-- Objeto: Raqueta izquierda
const raqI = {
  //-- Constante: Tamaño de la raqueta.
  width: 10,
  height: 40,

  //-- Constante: Posición inicial de la raqueta.
  x_ini: 10,
  y_ini: 40,

  //-- Posicion generica de la raqueta.
  x: 0,
  y: 0,

  //-- Constante: velocidad
  v_ini: 3,

  //-- Velocidad (variable)
  v: 0,
}

function raqI_init() {
  //-- Inicializar la raqueta izquierda a su posición inicial.
  raqI.x = raqI.x_ini;
  raqI.y = raqI.y_ini;
}

function raqI_update() {
  //-- Acturalizar coordenada y de la raqueta izquierda en
  //-- función de la velocidad.
  raqI.y += raqI.v;
}

function raqI_draw() {
  //-- Dibujamos las raquetas de la misma forma que hemos dibujado la bola.
  ctx.beginPath();
  ctx.fillStyle='yellow';

  //-- Raqueta izquierda
  ctx.rect(raqI.x, raqI.y, raqI.width, raqI.height);

  //-- Pintar!
  ctx.fill();
}

// -- Funcion que pinta todos los objetos en el canvas
function draw() {
  //-- Dibujar la Bola
  bola.draw();

  //-- Dibujar la raqueta izquierda
  raqI_draw();

  //------- Dibujar la raqueta derecha
  ctx.beginPath();
  ctx.fillStyle='white';

  //-- Raqueta derecha
  ctx.rect(550, 100, 10, 40);

  //-- Pintar!
  ctx.fill();

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

  //-- Dibujamos el tanteo
  ctx.font = "80px fantasy";
  ctx.fillStyle = "#0C98D5";
  ctx.fillText("0", 200, 80);
  ctx.fillText("1", 340, 80);
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
    sound1.play();
  }else if(bola.x <= 0.0){
    bola.vx = bola.vx * -1; //-- Hay colisión. Como el signo de la bola era negativo
                            //-- volvemos a multiplicar por -1 para que vuelva a ser positivo.
    sound1.play();
  }else if (bola.y >= canvas.height) {
    bola.vy = bola.vy * -1;
    sound1.play();
  }else if (bola.y <= 0.0) {
    bola.vy = bola.vy * -1;
    sound1.play();
  }
  //-- Comprobar si hay colisión con la raqueta izquierda
  if (bola.x >= raqI.x && bola.x <=(raqI.x + raqI.width) &&
    bola.y >= raqI.y && bola.y <=(raqI.y + raqI.height)) {
      bola.vx = bola.vx * -1;
  }

  //-- Actualizar la coordenada x de la bola, en función
  //-- de su velocidad.
  bola.update();

  //-- Actualizar las coordenadas de la raqueta.
  raqI_update();

  //-- Borrar el canvas. Argumentos: esquina superior izquierda, altura, anchura.
  //-- Lo borramos por completo.
  ctx.clearRect(0,0, canvas.width, canvas.height);

  //-- Dibujar el nuevo frame
  draw();

  //-- Mostrar actividad en la consola
  console.log("Frame!");
}

//-- Inicializa la bola a su posición inicial.
const bola = new Bola(ctx);
bola.init();

//-- Inicializar la raqueta a su posición inicial.
raqI_init();

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
    //-- Tecla ESPACIO: Saque.
    case " ":
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
}
