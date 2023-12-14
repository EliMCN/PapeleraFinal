document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("NameRegistrado").value = "";
  document.getElementById("PassRegistrado").value = "";

  document
    .querySelector("#formRegistrado")
    .addEventListener("submit", function (e) {
      e.preventDefault(); // Prevenir el envío del formulario por defecto
      validarFormulario("registrado");
    });
});

function validarFormulario(tipo) {
  let usuario, clave;

  if (tipo === "registrado") {
    usuario = document.getElementById("NameRegistrado").value;
    clave = document.getElementById("PassRegistrado").value;
  }

  if (usuario === "administrador" && clave === "clave123!") {
    alert("Acceso permitido. ¡Bienvenido, administrador!");
    window.location.href = "./panelGestion.html";
    document.querySelector(`#form${tipo}`).reset();
  } else if (usuario === "cliente" && clave === "clave123!") {
    alert("Acceso permitido. ¡Bienvenido, cliente registrado!");
    // Redirige a la página permitida para clientes registrados
    window.location.href = "./carrito.html";
    // Limpia el formulario después de un inicio de sesión exitoso para clientes registrados
    document.querySelector(`#form${tipo}`).reset();
  } else {
    alert("Credenciales incorrectas. Acceso denegado.");
  }

  // Devuelve false para prevenir el envío del formulario
  return false;
}
