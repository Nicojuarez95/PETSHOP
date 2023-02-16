export const urlApi = "https://mindhub-xj03.onrender.com/api/petshop";
export function filterType(list, type) {
  return list.filter((item) => item.categoria === type);
}
export function addItem(list, element) {
  element.innerHTML = "";
  let template = "";
  if (list.length != 0) {
    for (let card of list) {
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
                      <h4><a href="./detalles.html?id=${card._id}">${card.producto}</a></h4>

                      <div class="product-bottom-details">
                        <div class="product-price"><p class="${
                          card.disponibles < 5 ? "descuento" : "ocultar"
                          }">$${card.precio}</p><p class="precio">$${card.precio * 0.8}</p>
                        </div>

                        <div class="product-links">
                          <a href=""><i class="bi bi-cart"></i></a>
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
