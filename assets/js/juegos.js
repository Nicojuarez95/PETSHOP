import {
  urlApi,
  getData,
  filterType,
  addItem,
  nameFilter,
  readStorage,
  updateState,
  renderTabla,
} from "./module/funciones.js";
const $containerProduct = document.querySelector(".contenedor-jf");
const $search = document.querySelector(".isearch");
const $btnCarrito = document.getElementById("btn-carrito");
let carrito = readStorage("carrito");
let items;
getData(urlApi).then((data) => {
  items = filterType(data, "jugueteria");
  addItem(items, $containerProduct, carrito);
});
$search.addEventListener("keyup", (e) => {
  addItem(nameFilter(items, e.target.value), $containerProduct, carrito);
});
$containerProduct.addEventListener("click", (e) => {
  if (e.target.localName === "i") {
    carrito = updateState(e, carrito, items);
  }
});
$btnCarrito.addEventListener("click", (e) => {
  renderTabla(carrito);
});
