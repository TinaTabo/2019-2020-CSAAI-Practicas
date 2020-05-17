
console.log("Ejecutando JS...");
// Obtenemos los elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc');
img.width = 750;
img.height = 400;
const ctx = canvas.getContext('2d');

// Función de retrollamada de la imagen cargada
// La imagen no se carga instantaneamente, sino que lleva un tiempo.
// Sólo podemos acceder a ella una vez que esté totalmente cargada.
img.onload = function () {

  console.log("Imagen cargada");

  // Se establece como tamaño del canvas el mismo que el de la imagen Original
  canvas.width = img.width;
  canvas.height = img.height;

  // Situar la imagen original en el canvas (aun no se ha manipulado)
  ctx.drawImage(img, 0, 0);
};

console.log("Fin...");
