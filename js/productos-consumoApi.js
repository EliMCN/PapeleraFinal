const componenteCategoryBar = {
  template: `    
        <h2 class="title-gris">Categorías</h2>
      <button
        @click="toggleMenu"
        v-if="isMobile && !menuOpen"
        class="hamburger-menu"
        aria-label="Abrir menú de categorías"
      >
        <img src="./Imagenes/assets/hamburg-icon.png" alt="hamburger-menu" />
      </button>
      <button
        @click="toggleMenu"
        v-if="isMobile && menuOpen"
        class="close-icon"
        aria-label="Cerrar menú de categorías"
      >
        <img src="./Imagenes/assets/close-icon.png" alt="close-icon" />
      </button>
      <ul id="category-list" class="menu" :class="{ 'menu-open': menuOpen && isMobile }">
          <li>
            <a href="#" class="categoria-link" @click="mostrarProductos('Agendas')">
              <img src="./Imagenes/assets/agenda-icon.png" alt="Icono Agenda" />
              Agendas
            </a>
          </li>
          <li>
            <a href="#" class="categoria-link" @click="mostrarProductos('Artística')">
              <img src="./Imagenes/assets/artistica-icon.png" alt="Icono Artística" />
              Artística
            </a>
          </li>
          <li>
            <a href="#" class="categoria-link" @click="mostrarProductos('Comercial')">
              <img src="./Imagenes/assets/comercial-icon.png" alt="Icono Comercial" />
              Comercial
            </a>
          </li>
          <li>
            <a href="#" class="categoria-link" @click="mostrarProductos('Escolar')">
              <img src="./Imagenes/assets/escolar-icon.png" alt="Icono Escolar" />
              Escolar
            </a>
          </li>
          <li>
            <a href="#" class="categoria-link" @click="mostrarProductos('Regaleria')">
              <img src="./Imagenes/assets/regaleria-icon.png" alt="Icono Regalería" />
              Regalería
            </a>
          </li>
          <li>
            <a href="#" class="categoria-link" @click="mostrarProductos('Resmas y Papeles')">
              <img src="./Imagenes/assets/resmas-icon.png" alt="Icono Resmas y Papeles" />
              Resmas y Papeles
            </a>
          </li>
          <li>
            <a href="#" class="categoria-link" @click="mostrarProductos('Tecnico')">
              <img src="./Imagenes/assets/tecnica-icon.png" alt="Icono Técnico" />
              Técnico
            </a>
          </li>
          <li>
            <a href="#" class="categoria-link" @click="mostrarProductos('Tecnologia')">
              <img src="./Imagenes/assets/tecno-icon.png" alt="Icono Tecnología" />
              Tecnología
            </a>
          </li>
        </ul>    
    `,
  data() {
    return {
      menuOpen: false,
      isMobile: window.innerWidth <= 767,
      productosFiltrados: [],
      categoriaSeleccionada: "",
    };
  },
  created() {
    window.addEventListener("resize", this.checkScreenWidth);
    this.checkScreenWidth(); // Verificar el ancho de pantalla al inicio
    this.$emit("cargar-carrito");
  },
  methods: {
    toggleMenu() {
      if (this.isMobile) {
        this.menuOpen = !this.menuOpen;
      }
      this.$emit("categoria-seleccionada", this.categoriaSeleccionada);
    },
    checkScreenWidth() {
      const isMobile = window.innerWidth <= 767;
      this.isMobile = isMobile;

      if (!isMobile) {
        // Si no es móvil, el menú debe estar siempre abierto
        this.menuOpen = true;
      }
    },
    mostrarProductos(categoriaSeleccionada) {
      console.log(
        "Mostrando productos de la categoría:",
        categoriaSeleccionada
      );
      this.$emit("categoria-seleccionada", categoriaSeleccionada);
      if (this.datos) {
        const productosFiltrados = this.datos.filter(
          (producto) => producto.categoria === categoriaSeleccionada
        );
        const productosHTML = productosFiltrados
          .map(
            (item) => `
            <div class="producto">
              <img class="imagen" :src="item.imagen" :alt="'imagen de ' + item.nombre">
              <h3 class="nombre">{{ item.nombre }}</h3>
              <h3 class="precio">$ {{ item.precio.toFixed(2) }}</h3>
              <p class="categoria">{{ item.categoria }}</p>
              <button>Agregar al Carrito</button>
            </div>
          `
          )
          .join("");

        document.querySelector(".productos").innerHTML = productosHTML;

        // Actualizar "productosFiltrados"
        this.productosFiltrados = productosFiltrados;
        console.log(
          "Productos filtrados actualizados:",
          this.productosFiltrados
        );
      }
    },
  },
};

const componenteProductList = {
  template: `
        <div class="contenedorProductos">
          <div class="producto" v-for="elemento in datos" :key="elemento.id">
            <img
              :src="elemento.imagen"
              :alt="elemento.nombre"
            />
            <h3>{{ elemento.nombre }}</h3>
            <h3>Precio: {{ elemento.precio.toFixed(2) }}</h3>
            <p>Categoría: {{ elemento.categoria }}</p>
            <button class="boton-agregar" @click="agregarAlCarrito(elemento)">
              Agregar al Carrito
            </button>
            
          </div>
        </div>  
        <div id=Compras class="contenedor-carrito">
          <div class="areaTitulo-miCompra">                
              <img src="./Imagenes/assets/shopping-cart-icon-.png" alt="icon carrito"
              />          
            <h2> Mi Compra</h2>
          </div>
          <div class="areaMain-miCompra">
            <div class="item" v-for="item in carrito" :key="item.id">
                <img :src="item.imagen" :alt="item.nombre" />
                <h4>{{ item.nombre }}</h4>              
                <h4>Precio: {{ (item.precio * item.cantidad).toFixed(2) }}</h4>
                <div class="agregaCantidad-miCompra">
                  <button class="boton-agregar" @click="agregarAlCarrito(item)">+</button>
                  <h5>Cantidad: {{ item.cantidad }}</h5>
                  <button class="boton-quitar" @click="quitarDelCarrito(item)">-</button>
                </div>
                <button class="boton-eliminar" @click="eliminarDelCarrito(item)">
                  <img src="./Imagenes/assets/eliminar.png" alt="icon eliminar-papelera">
                </button>
            </div>
  
            </div>
              <div class="resumen-miCompra" v-if="!carritoVacio"> 
                  <h3>Resumen de la Compra</h3>
                  <p>Total: {{ totalCompra.toFixed(2) }}</p>
              </div>
              <p id="carrito-vacio" v-if="carritoVacio">No tiene ningún artículo en el carro de compra.</p>
              <button class="boton-guardar" v-if="!carritoVacio" @click="guardarCarrito">
                  <img src="./Imagenes/assets/ic_listas_detail.png" alt="" >
                  <h4>Guardar Carrito</h4>
              </button>
  
              <button class="boton-vaciar" v-if="!carritoVacio" @click="vaciarCarrito">
               <img src="./Imagenes/assets/ic_delete.png" alt="icono vaciar carrito">
               <h4>Vaciar Carrito</h4>
              </button>
              </div>
        </div>
    `,
  props: {
    datos: {
      type: Array,
      required: true,
      default: () => [],
    },
    carrito: {
      type: Array,
      required: true,
    },
  },
  created() {
    console.log("Datos del componente ProductList:", this.datos);
  },
  computed: {
    totalCompra() {
      return this.carrito.reduce(
        (total, item) => total + item.precio * item.cantidad,
        0
      );
    },
    carritoVacio() {
      return this.carrito.length === 0;
    },

    productosFiltrados() {
      return this.datos.filter(
        (producto) => producto.categoria === this.categoria
      );
    },
  },

  methods: {
    agregarAlCarrito(producto) {
      // Emitir un evento para notificar al componente principal que se debe agregar al carrito
      this.$emit("agregar-al-carrito", producto);
      console.log(
        "Agregando al carrito control linea 232 del componente:",
        producto
      );
      console.log("Contenido actual del carrito:", this.carrito);
    },

    quitarDelCarrito(item) {
      this.$emit("producto-quitado", item);
    },
    eliminarDelCarrito(item) {
      this.$emit("producto-eliminado", item);
    },
    guardarCarrito() {
      this.$emit("carrito-guardado");
    },
    cargarCarrito() {
      this.$emit("carrito-cargado");
    },
    vaciarCarrito() {
      this.$emit("carrito-vaciado");
    },
  },
};

const app = Vue.createApp({
  data() {
    return {
      error: false,
      datos: [],
      carrito: [],
      productosFiltrados: [],
      url: "https://papeleraZarate.pythonanywhere.com/api/productos_disponibles",
      totalCompra: 0,
      carritoVacio: true,
      categoria: "Escolar",
      categoriaSeleccionada: [],
      busqueda: "", //para la busqueda y submit por nombre
    };
  },
  components: {
    "componente-category-bar": componenteCategoryBar,
    "componente-product-list": componenteProductList,
  },
  created() {
    this.fetchdata(this.url);
    this.cargarCarrito();
    this.actualizarProductosFiltrados(this.categoria);
    console.log(
      "Evento categoria-seleccionada recibido. Categoría:",
      this.categoria
    );
  },

  methods: {
    fetchdata(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log("Datos cargados control app:", data);
          this.datos = data.productos_disponibles || [];
          this.actualizarProductosFiltrados(this.categoria);
          this.productosFiltrados = [...this.datos];
        })
        .catch((error) => {
          console.error("Error al cargar los datos control linea 294:", error);
          this.error = true;
        });
    },

    actualizarProductosFiltrados(categoriaSeleccionada) {
      console.log(
        "Evento categoria-seleccionada recibido. Nueva categoría:",
        categoriaSeleccionada
      );
      this.categoria = categoriaSeleccionada;
      // Filtrar por categoría
      this.productosFiltrados = this.datos.filter(
        (producto) => producto.categoria === categoriaSeleccionada
      );
      // Filtrar por término de búsqueda
      if (this.busqueda.trim() !== "") {
        const terminoBusqueda = this.busqueda.toLowerCase();
        this.productosFiltrados = this.productosFiltrados.filter((producto) =>
          producto.nombre.toLowerCase().includes(terminoBusqueda)
        );
      }
    },
    realizarBusqueda() {
      // Filtra por categoría
      this.actualizarProductosFiltrados(this.categoria);

      // Filtra por término de búsqueda si se ha proporcionado
      if (this.busqueda.trim() !== "") {
        const terminoBusqueda = this.busqueda.toLowerCase();
        this.productosFiltrados = this.productosFiltrados.filter((producto) =>
          producto.nombre.toLowerCase().indexof(terminoBusqueda)
        );
      }
    },

    agregarAlCarrito(producto_disponible) {
      console.log(
        "Agregar al carrito control desde la app:",
        producto_disponible
      );
      if (!this.carrito || this.carrito.length === 0) {
        console.log("this.carrito no está definido o está vacío.");
      }
      const itemEnCarrito = this.carrito.find(
        (item) => item.id === producto_disponible.id
      );
      console.log("Item en carrito:", this.carrito);

      if (itemEnCarrito) {
        // Si el producto ya está en el carrito, incrementa la cantidad
        itemEnCarrito.cantidad++;
      } else {
        // Si el producto no está en el carrito, suma uno con una cantidad de 1
        this.carrito.push({
          id: producto_disponible.id,
          imagen: producto_disponible.imagen,
          nombre: producto_disponible.nombre,
          precio: producto_disponible.precio,
          cantidad: 1,
        });
      } // Actualiza la propiedad carritoVacio
      this.carritoVacio = false;
    },
    quitarDelCarrito(item) {
      if (item.cantidad > 1) {
        item.cantidad--;
      } else {
        const index = this.carrito.indexOf(item);
        this.carrito.splice(index, 1);
      }
    },
    eliminarDelCarrito(item) {
      const index = this.carrito.indexOf(item);
      this.carrito.splice(index, 1);
    },
    guardarCarrito() {
      //guardo el carrito en array
      const contenidoGuardado = this.carrito.map((item) => ({
        id: item.id,
        imagen: item.imagen,
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.cantidad,
      }));

      // Almacenar en localStorage
      localStorage.setItem("carrito", JSON.stringify(contenidoGuardado));
      console.log(this.carrito);
      // Actualiza la propiedad carritoVacio
      this.carritoVacio = true;
    },
    // Si guarde el carrito despues tengo que volver a cargarlo al carrito cuando vuelva a cargar la pagina. Creo nueva funcion, recupero con parse y lo llamo en created con cargar carrito
    cargarCarrito() {
      const contenidoGuardado = localStorage.getItem("carrito");
      console.log("Cargando el carrito...");
      try {
        if (contenidoGuardado) {
          const carritoGuardado = JSON.parse(contenidoGuardado);
          if (Array.isArray(carritoGuardado)) {
            this.carrito = [];
            carritoGuardado.forEach((item) => {
              this.carrito.push({
                id: item.id,
                imagen: item.imagen,
                nombre: item.nombre,
                precio: item.precio,
                cantidad: item.cantidad,
              });
            });
            this.carritoVacio = this.carrito.length === 0;
          } else {
            console.error("El carrito guardado no es un array válido.");
            this.carritoVacio = true;
          }
        } else {
          this.carritoVacio = true;
        }
      } catch (error) {
        console.error("Error al cargar el carrito guardado:", error);
        this.carritoVacio = true;
      }
    },

    vaciarCarrito() {
      // Vacía completamente el carrito en la aplicación
      this.carrito = [];

      // Actualiza la propiedad carritoVacio
      this.carritoVacio = true;

      // Limpia el carrito en el Local Storage
      localStorage.removeItem("carrito");
    },
    actualizarTotalCompra() {
      this.totalCompra = this.carrito.reduce(
        (total, item) => total + item.precio * item.cantidad,
        0
      );
    },
  },
});

app.mount("#appApi");
