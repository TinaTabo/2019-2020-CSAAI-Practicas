

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

// -- Funcion que pinta todos los objetos en el canvas, se llamara cada vez que
// -- la posicion de uno de los objetos cambie.

//-- Variables para la bola
let bola_x = 50;
let bola_vx = 0;
let bola_y = 200;
let bola_vy = 0;

function draw() {
  //-- Dibujamos la bola (en este caso un cuadrado) de color blanco
  ctx.beginPath();
  ctx.fillStyle='red';

  //-- x,y,(coordenadas del vertice superior izquierdo), anchura, altura
  ctx.rect(bola_x, bola_y, 10, 10);


  //-- Pintar!
  ctx.fill();

  //-- Dibujamos las raquetas de la misma forma que hemos dibujado la bola.
  ctx.beginPath();
  ctx.fillStyle='yellow';

  //-- Raqueta izquierda
  ctx.rect(50, 300, 10, 40);

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

  //-- Comprobar si la bola ha alcanzado el límite derecho
  //-- Si es así, se cambia de signo la velocidad, para
  // que "rebote" y vaya en el sentido opuesto
  if (bola_x >= canvas.width) {
    //-- Hay colisión. Cambiar el signo de la bola
    bola_vx = bola_vx * -1;
    sound1.play();
  }else if(bola_x <= 0.0){
    bola_vx = bola_vx * -1; //-- Hay colisión. Como el signo de la bola era negativo
                            //-- volvemos a multiplicar por -1 para que vuelva a ser positivo.
    sound1.play();
  }else if (bola_y >= canvas.height) {
    bola_vy = bola_vy * -1;
    sound1.play();
  }else if (bola_y <= 0.0) {
    bola_vy = bola_vy * -1;
    sound1.play();
  }

  //-- Actualizar coordenada x de la bola, en funcion de
  //-- su velocidad
  bola_x += bola_vx;
  bola_y += bola_vy;

  //-- Borrar el canvas. Argumentos: esquina superior izquierda, altura, anchura.
  //-- Lo borramos por completo.
  ctx.clearRect(0,0, canvas.width, canvas.height);

  //-- Dibujar el nuevo frame
  draw();

  //-- Mostrar actividad en la consola
  console.log("Frame!");
}

//-- Arrancar la animacion. Esta funcion llama periodicamente a la Funcion
//-- animacion() con una frecuencia de 60Hz
//-- Arrancar la animación
setInterval(()=>{
  animacion();
},16);

//-- Obtener el boton de saque
const sacar = document.getElementById("sacar");

//-- Botón de saque:
//-- Dar a la bola una velocidad inicial
//-- También restablecemos la posicion inicial
sacar.onclick = () => {
  bola_x = 50;
  bola_vx = 5;
  bola_y = 200;
  bola_vy = 5;
  console.log("Saque!");
}
