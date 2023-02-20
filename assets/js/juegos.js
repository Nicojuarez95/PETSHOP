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
const $modalTabla = document.getElementById("modal-tabla");
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
$modalTabla.addEventListener("click", (e) => {
  if (e.target.localName === "i") {
    let totalAcomulado = [];
    if (e.target.classList[1] === "bi-plus-circle-fill") {
      carrito.forEach((item) => {
        if (item._id === e.target.classList[2]) {
          if (item.disponibles > item.__v) {
            item.__v++;
          }
          document.getElementById(
            "t" + e.target.classList[2]
          ).textContent = `$${item.__v * item.precio}`;
          document.getElementById(e.target.classList[2]).textContent = item.__v;
        }
        totalAcomulado = readStorage("totalAcomulado");
        totalAcomulado = totalAcomulado.map((itemT) => {
          if (itemT[0] === item._id) {
            return [itemT[0], item.__v * item.precio];
          } else {
            return itemT;
          }
        });
        localStorage.setItem("totalAcomulado", JSON.stringify(totalAcomulado));
      });
    } else if (e.target.classList[1] === "bi-dash-circle-fill") {
      carrito.forEach((item) => {
        if (item._id === e.target.classList[2]) {
          if (item.__v > 0) {
            item.__v--;
          }
          document.getElementById(
            "t" + e.target.classList[2]
          ).textContent = `$${item.__v * item.precio}`;
          document.getElementById(e.target.classList[2]).textContent = item.__v;
        }
        totalAcomulado = readStorage("totalAcomulado");
        totalAcomulado = totalAcomulado.map((itemT) => {
          if (itemT[0] === item._id) {
            return [itemT[0], item.__v * item.precio];
          } else {
            return itemT;
          }
        });
        localStorage.setItem("totalAcomulado", JSON.stringify(totalAcomulado));
      });
    }
    let aux = totalAcomulado.map((vec) => vec[1]);
    document.querySelector(".totalAcomulado").textContent = aux.reduce(
      (a, b) => a + b
    );
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  if (e.target.localName === "button") {
    e.target.parentElement.remove();
    carrito = carrito.filter((item) => item._id !== e.target.id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    let totalAcomulado = localStorage.getItem("totalAcomulado");
    totalAcomulado = readStorage("totalAcomulado");
    totalAcomulado = totalAcomulado.filter((item) => item[0] !== e.target.id);
    localStorage.setItem("totalAcomulado", JSON.stringify(totalAcomulado));
    let aux = totalAcomulado.map((vec) => vec[1]);
    if (aux.length !== 0) {
      document.querySelector(".totalAcomulado").textContent = aux.reduce(
        (a, b) => a + b
      );
    } else {
      document.querySelector(".totalAcomulado").textContent = 0;
    }
  }
});
