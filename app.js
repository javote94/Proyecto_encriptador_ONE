/*...................................... CAPTURE ELEMENTS ......................................*/
const textAreaInp = document.querySelector(".input-section__textarea");
const btnEncrypt = document.querySelector(".btn-encrypt");
const btnDecrypt = document.querySelector(".btn-decrypt");
const textAreaOut = document.querySelector(".output-section__textarea");
const btnCopy = document.querySelector(".btn-copy");
const containerNotMessage = document.querySelector(".output-section__container-not-message");


//!......................................EVENT HANDLERS......................................
document.addEventListener("DOMContentLoaded", function () {
  btnCopy.style.display = "none";  //al momento que se carga el documento HTML, se oculta el botón copiar
});

textAreaInp.addEventListener("input", function () {
  if (textAreaInp.value != "" || textAreaOut.value != "") {
    containerNotMessage.style.display = "none"; //cuando hay contenido escrito en el textarea la imagen del output desaparece
    btnCopy.style.display = "";  //y aparece el boton copiar
  } else {
    containerNotMessage.style.display = "";
    btnCopy.style.display = "none";
  }
});

btnEncrypt.addEventListener("click", function () {
  if (textAreaInp.value.trim().length > 0) {
    let encryptedText = encryptText(textAreaInp.value);  //encripta el texto del usuario
    showMessageOutput(encryptedText);  //muestra el resultado
    textAreaInp.value = "";  //vacía el textarea

  } else {
    myAlert("error", "Por favor, ingresa el texto a encriptar");
    showMessageOutput("");
  }
});

btnDecrypt.addEventListener("click", function () {
  if (textAreaInp.value.trim().length > 0) {
    let decryptedText = decryptText(textAreaInp.value);
    showMessageOutput(decryptedText);
    textAreaInp.value = "";

  } else {
    myAlert("error", "Por favor, ingresa el texto a desencriptar");
    showMessageOutput("");
  }

});

btnCopy.addEventListener("click", function () {
  textAreaOut.select();
  navigator.clipboard.writeText(textAreaOut.value)
    .then(() => { myAlert("success", "Texto copiado al portapapeles"); })
    .catch(error => { myAlert("error", "No se pudo copiar el texto"); });
});

//*......................................FUNCTIONS......................................
function encryptText(textUser) {

  //Inicializo variable que alojará el texto encriptado
  let encryptedText = "";

  //Cifrado letra por letra hasta encriptar todo el texto
  for (let t = 0; t < textUser.length; t++) {

    let encryptedLetter = false;

    for (let i = 0; i < matrix.length; i++) {
      if (textUser[t] == matrix[i][0]) {
        encryptedText += matrix[i][1];
        encryptedLetter = true;
        break;
      }
    }

    if (!encryptedLetter) {
      encryptedText += textUser[t];
    }
  }
  return encryptedText;
}

function decryptText(textUser) {

  //Descifrado letra por letra y alojarlo en la misma variable
  for (let i = 0; i < matrix.length; i++) {
    if (textUser.includes(matrix[i][1])) {
      textUser = textUser.replaceAll(matrix[i][1], matrix[i][0]);
    }
  }
  return textUser;
}

function showMessageOutput(phrase) {
  textAreaOut.innerText = phrase;
}

function myAlert(icon, message) {
  Swal.fire({
    icon: icon,
    text: message,
    timer: 1500,
    showConfirmButton: false,
    width: '30em'
  });
}

//Matriz que contiene las llaves de encriptación
const matrix = [
  ["a", "ai"],
  ["e", "enter"],
  ["i", "imes"],
  ["o", "ober"],
  ["u", "ufat"]
]
