const updateProductosApp = Vue.createApp({
  data() {
    return {
      id: 0,
      nombre: "",
      precio: 0,
      fecha: "",
      barra: "",
      unidadpaquete: 0,
      unidadcaja: 0,
      preciounitario: 0,
      conutilidad: 0,
      categoria: "",
      stock: 0,
      imagen: "",
      url: "https://papeleraZarate.pythonanywhere.com/gestionProductos/",
      loading: true,
      errored: false,
      modificationCompleted: false,
    };
  },
  created() {
    this.id = this.fetchIdFromUrl();
    if (!this.modificationCompleted && this.id) {
      const url = `${this.url}${this.id}`;
      this.fetchData(url);
    }
  },

  methods: {
    fetchIdFromUrl() {
      const params = new URLSearchParams(window.location.search);
      return params.get("id");
    },
    fetchData(url) {
      this.loading = true;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.id = data.id;
          this.nombre = data.nombre;
          this.precio = data.precio;
          this.fecha = data.fecha;
          this.barra = data.barra;
          this.unidadpaquete = data.unidadpaquete;
          this.unidadcaja = data.unidadcaja;
          this.preciounitario = data.preciounitario;
          this.conutilidad = data.conutilidad;
          this.categoria = data.categoria;
          this.stock = data.stock;
          this.imagen = data.imagen;
        })
        .catch((err) => {
          console.error(err);
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    modificar() {
      // Manejar la solicitud OPTIONS primero
      const optionsUrl = this.url;
      fetch(optionsUrl, {method: "OPTIONS"})
        .then(() => {
          console.log("OPTIONS request handled successfully");
          // Luego, realizar la solicitud PUT después de manejar OPTIONS
          const updateUrl = `${this.url}${this.id}`;
          let producto = {
            nombre: this.nombre,
            precio: this.precio,
            fecha: this.fecha,
            barra: this.barra,
            unidadpaquete: this.unidadpaquete,
            unidadcaja: this.unidadcaja,
            preciounitario: this.preciounitario,
            conutilidad: this.conutilidad,
            categoria: this.categoria,
            stock: this.stock,
            imagen: this.imagen,
          };

          var options = {
            body: JSON.stringify(producto),
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            credentials: "include", // para manejo de sesiones cookies
            redirect: "follow",
          };
          console.log("Before return:", updateUrl, options);
          return fetch(updateUrl, options);
        })
        .then((response) => {
          if (!response.ok) {
            if (response.status === 400) {
              return response.json().then((data) => {
                alert(data.message || "Error: Mensaje de error específico.");
                throw new Error("Error específico del servidor");
              });
            } else {
              throw new Error(response.statusText);
            }
          }
          // Si la respuesta es correcta, entonces parsear el JSON
          return response.json();
        })
        .then((data) => {
          alert("Registro modificado con éxito");
          this.modificationCompleted = true;
          window.location.href = "./gestionProductos.html";
        })
        .catch((err) => {
          console.error(err);

          if (err.message === "Error específico del servidor") {
          } else {
            alert("Error al Modificar. Por favor, intenta nuevamente.");
          }
        });
    },
  },
});

updateProductosApp.mount("#app-update-productos");
