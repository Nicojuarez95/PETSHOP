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
                      card.disponibles < 5 ? "badge" : "ocultar"
                    }"</div>Ultimas unidades</div>

                    <div class="product-tumb">
                      <img
                        src=${card.imagen}
                        alt=${card.producto.replaceAll(" ", "")} />
                    </div>

                    <div class="product-details">

                      <span class="product-catagory">Disponibles: ${
                        card.disponibles
                      }</span>
                      <h4><a href="./detalles.html?id=${card._id}">${
        card.producto
      }</a></h4>

                      <div class="product-bottom-details">
                        <div class="product-price"><p class="${
                          card.disponibles < 5 ? "descuento" : "ocultar"
                        }">$${card.precio}</p><p class="precio">$${
        card.precio * 0.8
      }</p>
                        </div>

                        <div class="product-links">
                        <button><i id=${
                          card._id
                        } class="bi ${aux}"></i></button>
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
    return nameArray.find((name) => name.startsWith(value));
  });
}
export function readStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
export function updateState(e, carrito, items) {
  if (e.target.localName === "i") {
    if (carrito.some((car) => car._id == e.target.id)) {
      carrito = carrito.filter((car) => car._id != e.target.id);
      e.target.classList.replace("bi-cart-check", "bi-cart");
    } else {
      carrito.push(items.find((item) => item._id == e.target.id));
      e.target.classList.replace("bi-cart", "bi-cart-check");
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    return carrito;
  }
}
