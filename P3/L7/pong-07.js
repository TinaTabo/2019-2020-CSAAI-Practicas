

console.log("Ejecutando JS...");

//-- Obtener el objeto canvas
const canvas = document.getElementById("canvas");

//-- Sus dimensiones las hemos fijado en el fichero
//-- HTML. Las imprimimos en la consola
console.log(`canvas: Anchura: ${canvas.width}, Altura: ${canvas.height}`);

//-- Obtenemos el contexto 2D para el canvas.
const ctx = canvas.getContext("2d");

// -- Funcion que pinta todos los objetos en el canvas, se llamara cada vez que
// -- la posicion de uno de los objetos cambie.

//-- Variables para la bola
let bola_x = 50;

function draw() {
  //-- Dibujamos la bola (en este caso un cuadrado) de color blanco
  ctx.beginPath();
  ctx.fillStyle='red';

  //-- x,y,(coordenadas del vertice superior izquierdo), anchura, altura
  ctx.rect(bola_x, 200, 10, 10); // Por el momento damos unos valores fijos de x,y
  // mas adelante estos valores seran variables para que la bola se desplace por el canvas

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
  //-- De moento no lo estamos haciendo

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

//-- Obtener el boton
const paso = document.getElementById("paso");

//-- Botón de dar un Paso: Cada vez que lo apretamos
//-- la bola avanza 5 píxeles hacia la derecha
Adelante.onclick = () => {
  //-- Incrementar la posicion x de la bola
  bola_x += 5;
  console.log("Paso!");
}

//-- Botón de dar un Paso: Cada vez que lo apretamos
//-- la bola avanza 5 píxeles hacia la izquierda
Atras.onclick = () => {
  //-- Incrementar la posicion x de la bola
  bola_x += -5;
  console.log("Paso!");
}
