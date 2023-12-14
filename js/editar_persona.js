console.log(location.search); // lee los argumentos pasados a este formulario
var id = location.search.substr(4); // producto_update.html?id=1
console.log(id);
const {createApp} = Vue;
createApp({
  data() {
    return {
      id: id,
      nombre: "",
      direccion: "",
      telefono: "",
      correo_electronico: "",
      nombre_usuario: "",
      password: "",
      rol: "",
      url: "https://papeleraZarate.pythonanywhere.com/personas/" + id,
    };
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.id = data.id;
          this.nombre = data.nombre;
          this.direccion = data.direccion;
          this.telefono = data.telefono;
          this.correo_electronico = data.correo_electronico;
          this.nombre_usuario = data.nombre_usuario;
          this.password = data.password;
          this.rol = data.rol;
        })

        .catch((err) => {
          console.error(err);
          this.error = true;
        });
    },
    modificar() {
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
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        redirect: "follow",
      };
      fetch(this.url, options)
        .then(() => {
          console.log(this.url);
          alert("Registro modificado");
          window.location.href = "./personas.html"; // navega a personas.html
        })
        .catch((err) => {
          console.error(err);
          alert("Error al Modificar");
        });
    },
  },
  created() {
    this.fetchData(this.url);
  },
}).mount("#app");
