function validarFormulario() {
  var nombre = document.getElementById("nombre").value.trim();
  var email = document.getElementById("email").value.trim();
  var telefono = document.getElementById("telefono").value.trim();
  var provincia = document.getElementById("provincia").value.trim();
  var pais = document.getElementById("pais").value.trim();
  var mensaje = document.getElementById("mensaje").value.trim();

  // Verificar si algún campo está en blanco
  if (
    nombre === "" ||
    email === "" ||
    telefono === "" ||
    provincia === "" ||
    pais === "" ||
    mensaje === ""
  ) {
    alert("Debe completar todos los campos del formulario.");
    return false;
  }

  // Verificar si el nombre contiene solo caracteres alfabéticos
  var nombreTest = /^[a-zA-Z]+$/.test(nombre);

  // nombreTest===false
  if (!nombreTest) {
    alert("Debe completar un nombre con las letras del abecedario.");
    return false;
  }

  // Validar E-mail: Debe ser un formato de correo electrónico válido.
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Por favor, ingrese una dirección de correo electrónico válida.");
    return false;
  }

  // Verificar si teléfono no es un número
  if (isNaN(telefono)) {
    alert("Debe completar teléfono solo con números.");
    return false;
  }

  // Verificar si provincia contiene solo letras
  var provinciaTest = /^[a-zA-Z]+$/.test(provincia);
  if (!provinciaTest) {
    alert("La provincia debe contener solo letras.");
    return false;
  }

  // Verificar si país contiene solo letras
  var paisTest = /^[a-zA-Z]+$/.test(pais);
  if (!paisTest) {
    alert("El país debe contener solo letras.");
    return false;
  }

  // Si todas las validaciones son exitosas, enviar el formulario
  alert("Se enviaron los datos correctamente.");
  return true;
}
