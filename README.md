# Proyecto Grupal Codo FULL STACK PYTHON
**Comisión 23537 - Profesora Marcela Cerda**


## Integrantes del grupo (por orden de inscripción al grupo):

1. Elizabeth Mc Nally - [GitHub](https://github.com/EliMCN)
2. Marisol Belliard - [GitHub](https://github.com/MarisolBell)
3. Alicia Aramayo - [GitHub](https://github.com/AramAli24)
4. Natalia Monterubbianesi - [GitHub](https://github.com/Nat-Monte)

## Enlaces:
- [Versión Navegable del Sitio Web (Netlify)](https://papelera-zarate-final.netlify.app/)
- [GitHub (Frontend)](https://github.com/MarisolBell/tpLibreria.git)
- [GitHub (Backend)](https://github.com/EliMCN/PapeleraFinal.git)

## Enlaces API PythonAnywhere:
- [Gestión de Productos](https://papeleraZarate.pythonanywhere.com/gestionProductos)
- [Personas](https://papeleraZarate.pythonanywhere.com/personas)

## Links al Drive Folder (Screenshot y Video):
- [Drive Screenshot y Video](https://drive.google.com/drive/folders/1eVIUkPv9lEYTWd2QJZieJnW4k5NaU6Ma?usp=sharing)
- [Drive Folder 2](https://drive.google.com/drive/folders/1XLsEWasVpYVw9hXV2Liz4Srvgy5EbUpc?usp=drive_link)

## Descripción del Proyecto "PAPELERA ZARATE":
El proyecto consiste en la creación de una aplicación web para la empresa "Papelera Zarate", con énfasis en la claridad, amigabilidad para el usuario y una arquitectura moderna y escalable. La aplicación es responsive y puede ser visualizada en diversos dispositivos y tamaños de pantalla.

## Informe Descriptivo de la APP web "Papelera Zarate"

### Estructura HTML
- Utilización de HTML5 con una declaración `<!DOCTYPE html>`.
- Metaetiquetas establecen la codificación y la escala inicial para dispositivos móviles.
- Utilización de un favicon personalizado de "Flaticon".
- Google Fonts se emplea para mejorar la tipografía del sitio.
- Barra de navegación con enlaces a otras secciones del sitio: INICIO, SHOP-ONLINE, PREGUNTAS FRECUENTES Y CONTACTO.
- Enlaces a redes sociales (Facebook e Instagram) con iconos correspondientes.
- Sitio responsive en todas sus páginas.
- Menú hamburguesa para modo celular.

### CSS
- Diseño Responsivo: Se aplican reglas de diseño específicas para pantallas pequeñas, tabletas y dispositivos de pantalla grande.
- Cambios de Color y Escala: Se implementan cambios de color y escala en elementos como botones y enlaces de navegación al interactuar con ellos.

### Animaciones
- Utilización de la librería "animate.css" para aplicar animaciones a elementos específicos como el icono de WhatsApp y una frase en el hero de la página de inicio.
- Cambio de color en el título "Novedades" en la página de inicio.
- Carousel en la página de shop-online.

### Flexbox y Grid
- Se utiliza Flexbox y Grid para el diseño de la página en diversas secciones.

### Página de Inicio (Index)
- Título llamativo y botón de llamada a la acción con efectos de escala y cambio de color.
- Sección de Novedades con productos nuevos y efecto de cambio de color en el título.
- Pie de Página (Footer) con enlace de regreso al inicio, información de contacto y enlaces a redes sociales.

### Shop General
- Sección de Bienvenida (Hero) con título, descripciones y mensaje de descubrimiento de productos.
- Inicio de Sesión o Registro con dos secciones (a implementar en la segunda entrega).
- Carrusel de Imágenes en la página de shop-online.
- Enlaces a Páginas (Carrito y Contacto).
- Utilización de FontAwesome para incluir iconos personalizados.

### Carrito
- Contenido del Carrito en el contenido principal.
- Filtrado de productos por categoría y visualización de lista de productos.
- Botones para agregar, quitar y eliminar productos del carrito.
- Funcionalidad para guardar, cargar y vaciar el carrito.
- Utilización de Vue.js y JavaScript para la funcionalidad del carrito y la lista de productos.

### Página de Contacto y Preguntas Frecuentes
- Página de Preguntas Frecuentes con preguntas y respuestas colapsables.
- Página de Contacto con mapa de Google Maps (Iframe) y disposición de CSS Grid.

### Consumo de la API
- En la primera etapa, los datos se cargaban desde un archivo JSON local.
- Visualización de Productos con Vue.js.
- Almacenamiento en Local Storage para persistir el carrito de compras entre sesiones del usuario.

### Validación del Formulario
- Validación del formulario en JavaScript para garantizar la integridad de los datos ingresados.

### JavaScript - Scripts
- Código JavaScript para gestionar y actualizar dinámicamente el contenido del footer y el header.
- Uso de cadenas de texto predefinidas con contenido HTML y asignación a los elementos del documento HTML.

## Proyecto Backend
- Implementación de un servidor backend con Flask para gestionar productos y usuarios en una base de datos MySQL.
- Definición de clases de modelos de base de datos: Producto y Persona.
- Esquemas de Marshmallow para serialización de objetos Python a JSON y viceversa.
- Creación y configuración de tablas en la base de datos utilizando SQLAlchemy.
- Endpoints para operaciones CRUD en productos y usuarios.
- Manejo de errores y validación de datos.

### Tabla de Productos
- Visualización de productos en una tabla con clases de Bootstrap.
- Botones para agregar, ver detalles, modificar y eliminar productos.
- Utilización de Vue.js para manejar eventos y acciones asociadas a los botones.
- Modal emergente para mostrar detalles adicionales de un producto específico.

### Tabla de Usuarios
- Visualización de usuarios en una tabla con clases de Bootstrap.
- Botones para agregar, editar y eliminar usuarios.
- Utilización de Vue.js para manejar eventos y acciones asociadas a los botones.

### Login
- Implementación de un login con vistas de cliente y administrador.

### Consumo de la API
- En la segunda etapa, el carrito de compras obtiene y gestiona datos de productos a través de una API en PythonAnywhere.
- La API permite visualizar, agregar, modificar y eliminar productos en el carrito de compras de manera eficiente y segura.
