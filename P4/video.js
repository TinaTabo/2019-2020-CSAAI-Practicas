
console.log("Ejecutando JS...");

// Cargamos los videos que se van a reproducir en el realizador de TV.
// MAINPLAYER - Video principal
const video0= document.getElementById("video0");
video0.width = 750;
video0.height = 400;
// Imagen fija del reproductor cuando no reproduce nada.
video0.poster ="https://github.com/TinaTabo/Extra-CSAAI/raw/master/BTS.jpg";

// PLAYER1 - video1 - BTS-BlackSwan
const video1 =  document.getElementById("video1");
video1.width = 250;
video1.height = 150;
video1.src="https://github.com/TinaTabo/Extra-CSAAI/raw/master/BTS-BlackSwan.mp4";

// PLAYER2 - video2 - BTS-NotToday
const video2 = document.getElementById("video2");
video2.width = 250; //--Tamaño de la pantalla de video
video2.height = 150;
video2.src="https://github.com/TinaTabo/Extra-CSAAI/raw/master/BTS-NotToday.mp4";

// PLAYER3 - video3 - BTS-Idol
const video3 = document.getElementById("video3");
video3.width = 250; //--Tamaño de la pantalla de video
video3.height = 150;
video3.src="https://github.com/TinaTabo/Extra-CSAAI/raw/master/BTS-Idol.mp4";

// PLAYER4 - simula un video de prueba que es una imagen estatica.
// Muestra en el reproductor la imagen de las barras de colores.
imagen.src="https://github.com/TinaTabo/Extra-CSAAI/raw/master/barras.png";
imagen.width = 250;
imagen.height = 150;

// Control de funcionamiento de los botones.

// PLAYER1 - video1 - BTS-BlackSwan
play1.onclick = () =>{
  console.log("Reproduciendo BTS-BlackSwan");
  video0.poster = false;
  video0.src= video1.src;
  video0.muted = false;
  video0.currentTime = video1.currentTime;

};

// PLAYER2 - video2 - BTS-NotToday
play2.onclick = () =>{
  console.log("Reproduciendo BTS-NotToday");
  video0.poster = false;
  video0.src= video2.src;
  video0.muted = false;
  video0.currentTime = video2.currentTime;

};

// PLAYER3 - video3 - BTS-Idol
play3.onclick = () =>{
  console.log("Reproduciendo BTS-Idol");
  video0.poster = false;
  video0.src= video3.src;
  video0.muted = false;
  video0.currentTime = video3.currentTime;

};

// PLAYER4
play4.onclick = () =>{
  video0.poster = imagen.src;
  video0.src = null;
}
