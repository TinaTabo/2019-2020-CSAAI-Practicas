// Autor: Cristina Taboada
 console.log("Empezamos!!...");

 display = document.getElementById("display")
 igual = document.getElementById("igual")
 clear = document.getElementById("clear")
 borrar = document.getElementById("borrar")

 // Crear un array con todos los elementos de la clase digito.
 digito = document.getElementsByClassName("digito")

 // Este bucle crea una cadena de digitos, me permite introducir en
 // la calculadora un numero de mas de un digito.
 for (i=0; i<digito.length; i++) {
    digito[i].onclick = (ev) => {
      if (display.innerHTML == "0"){
        display.innerHTML = ev.target.value;
      }else{
        display.innerHTML += ev.target.value;
      }
    }
 }

 // Crear un array con todos los elementos de la clase operador.
 operador = document.getElementsByClassName("operador")
 // Este bucle crea una cadena de operadores, me permite introducir en
 // la calculadora distintos tipos de operadores: suma, resta, multiplicación...
 for (i=0; i<operador.length; i++) {
    operador[i].onclick = (ev) => {
      if (display.innerHTML == "0"){
        display.innerHTML = ev.target.value;
      }else{
        display.innerHTML += ev.target.value;
      }
    }
 }

  // Evaluar la expresion, el igual de toda la vida.
  igual.onclick = () => {
    display.innerHTML = eval(display.innerHTML);
  }

  // Poner a cero la expresion
 clear.onclick = () => {
   display.innerHTML = "0";
 }

// Borrar el ultimo numero o operador que hemos introducido en el
// array a valorar.
 borrar.onclick = () => {
   if (display.innerHTML == "0"){
     display.innerHTML = "0";
   }else if (display.innerHTML == "") {
     display.innerHTML = "0";
   }else{
     display.innerHTML = display.innerHTML.slice(0,-1)
   }
 }
