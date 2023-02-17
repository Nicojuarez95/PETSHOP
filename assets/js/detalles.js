import {getData, urlApi} from "./module/funciones.js";
const $container = document.querySelector(".contenedor-detalles");
const params = new URLSearchParams(location.search);
const id = params.get("id");

getData(urlApi).then((data) => {
  const card = data.find((event) => event._id == id);
  $container.innerHTML = `<div class="producto-detalles">

  <div class="${
    card.disponibles < 5 ? "badge" : "ocultar"
  }"</div>Ultimas unidades</div>

  <div class="imagen-details">
      <img src=${card.imagen} alt=${card.producto.replaceAll(" ", "")} />
  </div>

    <div class="contenido-detalle">

      <div><p>${card.descripcion}</p></div>

      <div class="product-">
        <span class="product-catagory">Disponibles: ${card.disponibles}</span>
        <h4><a href="./detalles.html?id=${card._id}">${card.producto}</a></h4>
      </div>

      <div class="product-bottom-details">
        <div class="product-price"><p class="${
          card.disponibles < 5 ? "descuento" : "ocultar"
        }">$${card.precio}</p><p class="precio">$${card.precio * 0.8}</p></div>
      </div>

      

      <div class="product-links">
        <a href=""><i class="bi bi-cart"></i></a>
      </div>
      
    </div>
</div>`;
});
