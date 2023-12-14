const gestionProductosApp = Vue.createApp({
  data() {
    return {
      productos: [],
      producto: {},
      url: "https://papeleraZarate.pythonanywhere.com/gestionProductos",
      urlDetalles:
        "https://papeleraZarate.pythonanywhere.com/gestionProductos/detalles",
      errored: false,
      loading: true,
      /*atributos para el guardar los valores del formulario */
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
      productoSeleccionado: null, // para el boton mostrar info
      detallesProducto: null, // para el boton mostrar info
    };
  },

  methods: {
    fetchData(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.productos = data;
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
    grabar() {
      let producto = {
        id: this.id,
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
        method: "POST",
        headers: {"Content-Type": "application/json"},
        redirect: "follow",
      };
      fetch(this.url, options)
        .then(function () {
          alert("Registro grabado");
          window.location.href = "./gestionProductos.html";
        })
        .catch((err) => {
          console.error(err);
          alert("Error al Grabar");
        });
    },
    obtenerDetallesProducto(id) {
      const urlDetalles = `${this.urlDetalles}/show/${id}`;
      console.log("URL de detalles:", urlDetalles);

      return fetch(urlDetalles)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Error al obtener detalles del producto: ${response.statusText}`
            );
          }

          // Retorna directamente el cuerpo de la respuesta como JSON
          return response.json();
        })
        .then((data) => {
          console.log("Respuesta del servidor:", data);

          // Asigna los detalles del producto
          this.detallesProducto = data;

          // Retorna los detalles para ser utilizados si es necesario
          return data;
        })
        .catch((error) => {
          console.error(
            "Error al obtener detalles del producto:",
            error.message
          );
          alert("Error al obtener detalles del producto");
          throw error;
        });
    },

    mostrarDetalles(id) {
      console.log("Mostrando detalles para el producto con ID:", id);

      // Abrir detalles del producto y desplazar la vista
      this.productoSeleccionado = id;

      // Obtener detalles del producto
      this.obtenerDetallesProducto(id)
        .then((detalles) => {
          // Almacenar los detalles del producto
          this.detallesProducto = detalles;
        })
        .catch((error) => {
          console.error("Error al obtener detalles del producto:", error);
          alert("Error al obtener detalles del producto");
        });
    },
  },
  created() {
    this.fetchData(this.url);
  },
  computed: {
    totalStock() {
      return this.productos.reduce(
        (total, producto) => total + producto.stock,
        0
      );
    },
  },
});

// Monta la aplicación en el elemento especificado
gestionProductosApp.mount("#app-gestion-productos");
