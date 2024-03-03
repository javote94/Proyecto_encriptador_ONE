const textArea = document.querySelector(".text-area");
const btnEncriptar = document.querySelector(".btn-encriptar");
const btnDesencriptar = document.querySelector(".btn-desencriptar");
const mensaje = document.querySelector(".mensaje");
const btnCopiar = document.querySelector(".btn-copiar");


//!......................................MANEJADORES DE EVENTOS......................................
btnEncriptar.addEventListener("click", function () {
  if (textArea.value.trim().length > 0) {
    let textoEncriptado = encriptarTexto(textArea.value);  //encripta el texto del usuario
    mostrarMensaje(textoEncriptado);  //muestra el resultado
    textArea.value = "";  //vacía el textarea
    mensaje.style.backgroundImage = "none";  //saca la imagen del lugar donde se muestra el resultado

  } else {
    alert("Por favor, ingresa el texto a encriptar");
    mostrarMensaje("");
  }
});

btnDesencriptar.addEventListener("click", function () {
  if (textArea.value.trim().length > 0) {
    let textoDesencriptado = desencriptarTexto(textArea.value);
    mostrarMensaje(textoDesencriptado);
    textArea.value = "";

  } else {
    alert("Por favor, ingresa el texto a desencriptar");
    mostrarMensaje("");
  }

});

btnCopiar.addEventListener("click", function () {
  mensaje.select();
  navigator.clipboard.writeText(mensaje.value)
    .then(() => { alert("Texto copiado al portapapeles"); })
    .catch(error => { alert("No se pudo copiar el texto: ", error); });
});

//*......................................FUNCIONES......................................
function encriptarTexto(textoUsuario) {

  //Inicializo variable que alojará el texto encriptado
  let textoEncriptado = "";

  //Cifrado letra por letra hasta encriptar todo el texto
  for (let t = 0; t < textoUsuario.length; t++) {

    let letraEncriptada = false;

    for (let i = 0; i < matriz.length; i++) {
      if (textoUsuario[t] == matriz[i][0]) {
        textoEncriptado += matriz[i][1];
        letraEncriptada = true;
        break;
      }
    }

    if (!letraEncriptada) {
      textoEncriptado += textoUsuario[t];
    }
  }
  return textoEncriptado;
}

function desencriptarTexto(textoUsuario) {

  //Descifrado letra por letra y alojarlo en la misma variable
  for (let i = 0; i < matriz.length; i++) {
    if (textoUsuario.includes(matriz[i][1])) {
      textoUsuario = textoUsuario.replaceAll(matriz[i][1], matriz[i][0]);
    }
  }
  return textoUsuario;
}

function mostrarMensaje(frase) {
  mensaje.innerText = frase;
}

//Matriz que contiene las llaves de encriptación
const matriz = [
  ["a", "ai"],
  ["e", "enter"],
  ["i", "imes"],
  ["o", "ober"],
  ["u", "ufat"]
]
