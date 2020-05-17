console.log("Ejecutando JS....")
// Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc')
const ctx = canvas.getContext('2d');

// Deslizadores:
const slipper_R = document.getElementById('R');
const slipper_G = document.getElementById('G');
const slipper_B = document.getElementById('B');
// Valores de los deslizadores:
const value_R = document.getElementById('value_R');
const value_G = document.getElementById('value_G');
const value_B = document.getElementById('value_B');

// Botones de los filtros.
const bw = document.getElementById('bw');
const rgb = document.getElementById('rgb');
const negative = document.getElementById('negative');


// Función de retrollamada de imagen cargada
// La imagen no se carga instantaneamente, sino que lleva un tiempo. Sólo podemos
// acceder a ella una vez que esté totalmente cargada
img.onload = function () {
  // Se establece como tamaño del canvas el mismo que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  // Situar la imagen original en el canvas (No se han hecho manipulaciones todavia)
  ctx.drawImage(img, 0,0);

  console.log("Imagen lista...");
};

// MODO BLANCO Y NEGRO.
bw.onclick = () => {
  console.log("Aplicando filtro escala de grises");
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imgData.data;
  // Calculamos el nivel de brillo y se lo asignamos a los 3 canales, ya que la suma
  // de las componentes RGB en la misma proporción representa la escala de grises.
  // OJO con el incremento: tenemos que incrementar de 4 en 4 no de 1 en 1.
  for (var i = 0; i < data.length; i+= 4) {
    r = data[i];
    g = data[i + 1];
    b = data[i + 2];
    bright = (3*r + 4*g + b)/8;
    data[i] = bright;
    data[i + 1] = bright;
    data[i + 2] = bright;
  }
  ctx.putImageData(imgData, 0, 0);
  console.log("filtro escala de grises aplicado");
}

// MODO COMPONENTES RGB
rgb.onclick = () => {
  // Control deslizador R
  slipper_R.oninput = () => {
    console.log("Aplicando filtro componentes RGB componente R");
    value_R.innerHTML = slipper_R.value;
    ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

    for (var i = 0; i < data.length; i+=4) {
      if (data[i] > slipper_R.value){
        data[i] = slipper_R.value;
      }
      if (data[i+1] > slipper_G.value){
        data[i+1] = slipper_G.value;
      }
      if (data[i+2] > slipper_B.value){
        data[i+2] = slipper_B.value;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }

  // Control deslizador G
  slipper_G.oninput = () => {
    console.log("Aplicando filtro componentes RGB componente G");
    value_G.innerHTML = slipper_G.value;
    ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

    for (var i = 0; i < data.length; i+=4) {
      if (data[i] > slipper_R.value){
        data[i] = slipper_R.value;
      }
      if (data[i+1] > slipper_G.value){
        data[i+1] = slipper_G.value;
      }
      if (data[i+2] > slipper_B.value){
        data[i+2] = slipper_B.value;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }

  // Control deslizador B
  slipper_B.oninput = () => {
    console.log("Aplicando filtro componentes RGB componente B");
    value_B.innerHTML = slipper_B.value;
    ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

    for (var i = 0; i < data.length; i+=4) {
      if (data[i] > slipper_R.value){
        data[i] = slipper_R.value;
      }
      if (data[i+1] > slipper_G.value){
        data[i+1] = slipper_G.value;
      }
      if (data[i+2] > slipper_B.value){
        data[i+2] = slipper_B.value;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }
}

// MODO NEGATIVO
negative.onclick = () => {
  console.log("Aplicando filtro negativo");
  ctx.drawImage(img, 0,0);
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imgData.data;
  for (var i = 0; i < data.length; i+= 4) {
    r = data[i];
    g = data[i + 1];
    b = data[i + 2];
    data[i] = 255 - r;
    data[i + 1] = 255 - g;
    data[i + 2] = 255 - b;
  }
  ctx.putImageData(imgData, 0, 0);
  console.log("filtro negativo aplicado");
}
