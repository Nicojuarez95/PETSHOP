import {
  urlApi,
  getData,
  filterType,
  addItem,
  nameFilter,
  readStorage,
  updateState,
} from "./module/funciones.js";
const $containerProduct = document.querySelector(".contenedor-jf");
const $search = document.querySelector(".isearch");
let carrito = readStorage("carrito");
let items;
getData(urlApi).then((data) => {
  items = filterType(data, "farmacia");
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
