document.addEventListener("DOMContentLoaded", function () {
  var cad = `
  <header>
    <nav class="navbar navbar-expand-md bg-light navbar-light">
      <div class="container encabezado">
        <a class="navbar-brand" href="./index.html">
          <img class="logo" src="./assets/logoPapelera.jpg" alt="logo papelera"/>
        </a>
        <button
          class="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
          <ul class="navbar-nav me-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <a class="nav-link active" href="panelGestion.html" aria-current="page">
                Home <span class="visually-hidden">(current)</span>
              </a>
            </li>
           
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="dropdownId"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                ADMIN Dashboard
              </a>
              <div class="dropdown-menu" aria-labelledby="dropdownId">
                <a class="dropdown-item" href="gestionProductos.html">
                   Productos
                </a>
                <a class="dropdown-item" href="personas.html">
                  Usuarios
                </a>
                
              </div>
            </li>
          </ul>
          
        </div>
      </div>
    </nav>
  </header>
  `;
  document.getElementById("idheader").innerHTML = cad;

  var cad = `
    <a class="redsoc" href="https://www.facebook.com/" target="_blank"><i class="fa fa-facebook"
        aria-hidden="true"></i></a>
    
    <a class="redsoc" href="https://www.instagram.com/" target="_blank"><i class="fa fa-instagram"
        aria-hidden="true"></i></a>
    
    <p>Derechos reservados @ PapeleraZarate2023 </p>  
`;
  document.getElementById("idfooter").innerHTML = cad;
});
