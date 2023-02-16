import {addItem, getData, urlApi} from "./module/funciones.js";
const $container = document.querySelector("main");
const params = new URLSearchParams(location.search);
const id = params.get("id");
getData(urlApi).then((data) => {
  const card = data.find((event) => event._id == id);
  console.log(card);
});
