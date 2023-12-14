const {createApp} = Vue;
createApp({
  data() {
    return {
      personas: [],
      url: "https://papeleraZarate.pythonanywhere.com/personas",
      errored: false,
      loading: true,
      /*atributos para el guardar los valores del formulario */
      id: 0,
      nombre: "",
      direccion: "",
      telefono: "",
      correo_electronico: "",
      nombre_usuario: "",
      password: "",
      rol: this.rol || "cliente",
    };
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.personas = data;
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error en la solicitud:", error);
          alert("Error al realizar la solicitud al servidor");
          this.errored = true;
        });
    },
    eliminar(id) {
      const url = this.url + "/" + id;
      var options = {
        method: "DELETE",
      };
      fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
          alert("Registro Eliminado");
          location.reload(); // recarga el json luego de eliminado el registro
        });
    },
    validarFormulario() {
      // Validar que todos los campos estén llenos
      if (
        !this.nombre ||
        !this.direccion ||
        !this.telefono ||
        !this.correo_electronico ||
        !this.nombre_usuario ||
        !this.password
      ) {
        alert("Todos los campos son obligatorios.");
        return false;
      }

      // Validar dirección de correo electrónico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.correo_electronico)) {
        alert("Por favor, ingrese una dirección de correo electrónico válida.");
        return false;
      }
      // Verificar si el correo electrónico ya está registrado en el cliente
      const correoDuplicado = this.personas.some(
        (persona) => persona.correo_electronico === this.correo_electronico
      );

      if (correoDuplicado) {
        alert("Error: Correo electrónico ya registrado.");
        return;
      }

      // Validar que el teléfono contenga solo números
      const phoneRegex = /^\d+$/;
      if (!phoneRegex.test(this.telefono)) {
        alert("El teléfono debe contener solo números.");
        return false;
      }

      // Validar longitud de la contraseña
      if (this.password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return false;
      }

      // Validar que la contraseña contenga al menos una letra y un número
      const letraYNumero = /^(?=.*[A-Za-z])(?=.*\d)/;
      if (!letraYNumero.test(this.password)) {
        alert("La contraseña debe contener al menos una letra y un número.");
        return false;
      }
      return true;
    },
    grabar() {
      if (!this.validarFormulario()) {
        return; // Detener la ejecución si la validación falla
      }
      let persona = {
        nombre: this.nombre,
        direccion: this.direccion,
        telefono: this.telefono,
        correo_electronico: this.correo_electronico,
        nombre_usuario: this.nombre_usuario,
        password: this.password,
        rol: this.rol,
      };
      var options = {
        body: JSON.stringify(persona),
        method: "POST",
        headers: {"Content-Type": "application/json"},
        redirect: "follow",
      };
      fetch(this.url, options)
        .then((response) => {
          if (!response.ok) {
            // Verificar si el error es debido a correo electrónico duplicado
            if (response.status === 400) {
              return response.json().then((data) => {
                // Mostrar el mensaje específico del servidor
                alert(
                  data.message || "Error: Correo electrónico ya registrado."
                );
                throw new Error("Correo electrónico duplicado");
              });
            } else {
              // Para otros errores, lanzar la respuesta completa para obtener más detalles si es necesario
              throw new Error(response.statusText);
            }
          }
          // Si la respuesta es correcta y no es un error 400, entonces parsear el JSON
          return response.json();
        })
        .then((data) => {
          // Solo llegará aquí si la respuesta fue un JSON válido (no es un error 400)
          alert("Registro grabado");
          window.location.href = "./login.html";
        })
        .catch((err) => {
          console.error(err);

          if (err.message === "Correo electrónico duplicado") {
            // Ya manejamos el caso de correo duplicado, no es necesario hacer nada más aquí
          } else {
            // Para otros errores, mostrar mensaje adecuado
            alert("Error al Grabar. Por favor, intenta nuevamente.");
          }
        });
    },
  },
  created() {
    this.fetchData(this.url);
  },
}).mount("#appNuevoCliente");
