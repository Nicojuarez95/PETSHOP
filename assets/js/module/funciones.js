export const urlApi = "https://mindhub-xj03.onrender.com/api/petshop";
export function filterType(list, type) {
  return list.filter((item) => item.categoria === type);
}
export function addItem(list, element, carrito) {
  element.innerHTML = "";
  let template = "";
  let aux;
  if (list.length != 0) {
    for (let card of list) {
      aux = carrito.some((car) => car._id == card._id)
        ? "bi-cart-check"
        : "bi-cart";
      template += `<div class="product-card">

                    <div class="${
                      card.disponibles < 5 ? "badge" : "ocultar"}"</div>${card.disponibles != 0 ? "Ultimas Unidades" : "Agotado"}</div>
                    <div class="product-tumb">
                      <img
                        src=${card.imagen}
                        alt=${card.producto.replaceAll(" ", "")} />
                    </div>

                    <div class="product-details">
                      <span class="product-catagory">Disponibles: ${
                        card.disponibles}</span>
                      <h4><a href="./detalles.html?id=${card._id}">${card.producto}</a></h4>

                      <div class="product-bottom-details">
                        <div class="product-price"><p class="${
                          card.disponibles < 5 ? "descuento" : "ocultar"
                        }">$${card.precio}</p><p class="precio">$${card.precio * 0.8}</p>
                        </div>

                        <div class="product-links">
                        <button><i id=${
                          card.disponibles != 0 ? card._id : "agotado"
                        } class="bi ${card.disponibles != 0 ? aux : "bi-cart-dash"}"></i></button>
                        </div>
                        
                      </div>

                    </div>
                  </div>`;
    }
    element.innerHTML += template;
  } else {
    element.innerHTML = `<div id="notFound">
      <h3><i class="bi bi-exclamation-square"></i> Producto no Encontrado</h3>
    </div>`;
  }
}
export async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
export function nameFilter(list, value) {
  return list.filter((event) => {
    let nameArray = event.producto.toLowerCase().split(" ");
    return nameArray.find((name) => name.startsWith(value.toLowerCase()));
  });
}
export function readStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
export function updateState(e, carrito, items) {
  if (carrito.some((car) => car._id == e.target.id)) {
    carrito = carrito.filter((car) => car._id != e.target.id);
    e.target.classList.replace("bi-cart-check", "bi-cart");
    items.forEach((item) => {
      carrito.some((car) => car._id === item._id)
        ? (item.__v = 1)
        : (item.__v = 0);
    });
  } else {
    let item = items.find((item) => item._id == e.target.id);
    item.__v = 1;
    carrito.push(item);
    e.target.classList.replace("bi-cart", "bi-cart-check");
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  return carrito;
}
export function renderTabla(carrito) {
  const carritoModal = document.querySelector("#modal-tabla");
  const totalAcomulado = document.querySelector(".totalAcomulado");
  let cartaCarrito = document.createElement("div");
  cartaCarrito.className="cartaCarrito"
  let localTotal = [];
  let total = 0;
  if (carrito.length < 1) {
    carritoModal.innerHTML = `<tr><td colspan="5"><h5 class="text-center">No hay productos en tu carrito</h5></td></tr>`;
    totalAcomulado.textContent = ``;
  } else {
    carritoModal.innerHTML = "";
    carrito.forEach((e) => {
      let tr = document.createElement("tr");
      tr.className="tablaFila"
      tr.innerHTML = `  
      <th class="border-0" scope="row">
        <div class="p-2">
          <img class="img-fluid rounded shadow-sm me-1"src="${e.imagen}"alt="product0"width="">

          <div class="ml-3 d-inline-block align-middle">
            <h5 class="mb-0">${e.producto}</h5>
            <span class="text-muted font-weight-normal font-italic">Categoria: ${e.categoria}</span>
          </div>
        </div>
      </th>

    <div id="cont-precios">
      <td class="border-0">
        <strong>$${e.precio}</strong>
      </td>
      <button id="botonCarritoCantidad" class="aDisminuir"><i class="bi bi-dash-circle-fill ${e._id}"></i></button>
      <td class="border-0">
        <strong id=${e._id}>${e.__v}</strong>
      </td>
      <button id="botonCarritoCantidad" class="aAumentar"><i class="bi bi-plus-circle-fill ${e._id}"></i></button>
      <td class="border-0">
        <strong id="t${e._id}">$${e.precio * e.__v}</strong>
      </td>
  
      <button class="btn btn-danger borrar-carrito" id="${e._id}" >X</button>
    </div>
      `;
      cartaCarrito.appendChild(tr);
      localTotal.push([e._id, e.precio * e.__v]);
      return (total += e.precio * e.__v);
    });
    carritoModal.appendChild(cartaCarrito);
    localStorage.setItem("totalAcomulado", JSON.stringify(localTotal));
    totalAcomulado.textContent = `${total}`;
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
