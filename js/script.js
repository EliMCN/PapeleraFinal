
cad = `

      <div class="footer-icons">
        <a href="#arriba"
          ><img
            class="icono-flecha"
            src="./Imagenes/up-arrow.png"
            alt="flecha para arriba"
        /></a>

        <a href="https://api.whatsapp.com/send?phone=11111111">
          <img
            class="icono-whatsapp animate__animated animate__rubberBand"
            src="./Imagenes/whatsapp.png"
            alt="logo de whatsapp"
          />
        </a>
      </div>

      <div class="container container-footer">
        <!-- Información sobre redes sociales -->
        <div class="column column-redes">
          <h2 class="seguinos-footer">Seguinos!</h2>
          <a
            href="https://www.facebook.com/papelerazarate444/?locale=es_LA"
            class="social-link"
          >
            <img
              src="./Imagenes/facebook.png"
              alt="logo de Facebook"
              class="social-icon"
            />
          </a>
          <a
            href="https://www.instagram.com/papelerazarate/?hl=en"
            class="social-link"
          >
            <img
              src="./Imagenes/instagram.PNG"
              alt="logo de Instagram"
              class="social-icon"
            />
          </a>
        </div>

        <!-- Información de contacto -->
        <div class="column column-info">
          <ul>
            <li>Gral. Pinto 444/438</li>
            <li>Zárate - Pcia. de Buenos Aires (2800)</li>
            <li>Argentina</li>
            <li>Tel: +54 3487 421585</li>
            <li>whatsapp: +54 3487 216595</li>
            <li>pedidos@papelerazarate.com.ar</li>
            <li>info@papelerazarate.com.ar</li>
          </ul>
        </div>

        <!-- Enlaces de inicio, contacto y otros -->
        <div class="column column-links-header">
          <ul>
            <li><a href="./index.html">INICIO</a></li>
            <li><a href="./contacto.html">CONTACTO</a></li>
            <li><a href="./productos.html">SHOP ONLINE</a></li>
          </ul>
        </div>

        <!-- Imágenes QR -->
        <div class="column column-afip">
          <a href="https://www.afip.gob.ar/landing/default.asp">
            <img
              src="./Imagenes/img_sitio_productos/afip QR/Afip 444.PNG"
              alt="F960 Afip Pinto 444"
            />
          </a>
          <a href="https://www.afip.gob.ar/landing/default.asp">
            <img
              src="./Imagenes/img_sitio_productos/afip QR/Afip 444.PNG"
              alt="F960 Afip Pinto 438"
            />
          </a>
        </div>
      </div>

      <!-- Copyright -->
      <div class="copyright">
        <hr>
        <br>
        <p>Todos los derechos reservados.</p>
        <p>Desarrollado por Alumnos Codo a Codo &copy; 2023</p>
      </div>`;
  document.querySelector("footer").innerHTML = cad;


  /*  -----------------------------------------------  */
cad = `

    <a name="arriba"></a>
    <div class="menu_horizontal">
      <div class="logo">
        <div class="logo"><a href="./index.html"><img
              src="./Imagenes/logoPapelerahorizontal.png" alt="logo de la empresa"></a></div>
      </div>
      <div class="contenedor_menu">
        <input type="checkbox" id="menu-check">
        <label id="menu" for="menu-check">
          <span id="menu-abrir">&#9776;</span>
          <span id="menu-cerrar">X</span>
        </label>

        <nav class="nav__links">
          <ul>
            <li><a href="./index.html">INICIO</a></li>
            <li><a href="./productos.html">SHOP ONLINE</a></li>
            <li><a href="./preguntas-Frecuentes.html">PREGUNTAS FRECUENTES</a></li>
            <li><a href="./contacto.html">CONTACTO</a></li>
          </ul>
        </nav>
      </div>
    </div>
  ` ;
    document.querySelector("header").innerHTML = cad;

