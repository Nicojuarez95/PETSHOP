import {
  urlApi,
  getData,
  filterType,
  addItem,
  nameFilter,
} from "./module/funciones.js";
const $containerProduct = document.querySelector(".contenedor-jf");
const $search = document.querySelector(".isearch");
let items;
getData(urlApi).then((data) => {
  items = filterType(data, "farmacia");
  addItem(items, $containerProduct);
});
$search.addEventListener("keyup", (e) => {
  addItem(nameFilter(items, e.target.value), $containerProduct);
});
