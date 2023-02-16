import {urlApi, getData, filterType, addItem} from "./module/funciones.js";
let $containerProduct = document.querySelector(".contenedor-jf");
getData(urlApi).then((data) => {
  console.log(data);
  addItem(filterType(data, "jugueteria"), $containerProduct);
});
