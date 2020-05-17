
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
// Quita la imagen fija o el video que se estaba reproduciendo anteriormente
// en el mainplayer y empieza a reproducir el video 1 en el mainplayer.
const play1 = document.getElementById("play1");
play1.onclick = () =>{
  console.log("Reproduciendo BTS-BlackSwan");
  video0.poster = false;
  video0.src= video1.src;
  video0.muted = false;
  video0.currentTime = video1.currentTime;
  video1.style.border = 'groove #6F6F76';
  video2.style.border = null;
  video3.style.border = null;
  imagen.style.border = null;
};

// PLAYER2 - video2 - BTS-NotToday
// Quita la imagen fija o el video que se estaba reproduciendo anteriormente
// en el mainplayer y empieza a reproducir el video 2 en el mainplayer.
const play2 = document.getElementById("play2");
play2.onclick = () =>{
  console.log("Reproduciendo BTS-NotToday");
  video0.poster = false;
  video0.src= video2.src;
  video0.muted = false;
  video0.currentTime = video2.currentTime;
  video1.style.border = null;
  video2.style.border = 'groove #6F6F76';
  video3.style.border = null;
  imagen.style.border = null;
};

// PLAYER3 - video3 - BTS-Idol
// Quita la imagen fija o el video que se estaba reproduciendo anteriormente
// en el mainplayer y empieza a reproducir el video 3 en el mainplayer.
const play3 = document.getElementById("play3");
play3.onclick = () =>{
  console.log("Reproduciendo BTS-Idol");
  video0.poster = false;
  video0.src= video3.src;
  video0.muted = false;
  video0.currentTime = video3.currentTime;
  video1.style.border = null;
  video2.style.border = null;
  video3.style.border = 'groove #6F6F76';
  imagen.style.border = null;
};

// PLAYER4
// Elimina la fuente de video del reproductor principal y muestra la imagen fija
// de las barras de colores.
const play4 = document.getElementById("play4");
play4.onclick = () =>{
  video0.poster = imagen.src;
  video0.src = null;
  video1.style.border = null;
  video2.style.border = null;
  video3.style.border = null;
  imagen.style.border = 'groove #6F6F76';
}
