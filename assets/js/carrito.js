import {urlApi, getData, readStorage, renderTabla} from "./module/funciones.js";
const $btnCarrito = document.getElementById("btn-carrito");
const $modalTabla = document.getElementById("modal-tabla");
const $modal = document.getElementById("exampleModal");
const botonComprar = document.getElementById("modalBuy");
let carrito = readStorage("carrito");
getData(urlApi).then((data) => {
  let items = data;
  items.forEach((item) => {
    carrito.some((car) => car._id === item._id)
      ? (item.__v = 1)
      : (item.__v = 0);
  });
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
      (a, b) => a + b,
      0
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
$modal.addEventListener("click", (e) => {
  if (e.target.localName === "button") {
    if (e.target.id === "modalClose") {
      setTimeout(function () {
        location.reload();
      }, 300);
    } else if (e.target.id === "modalDelete") {
      $modalTabla.innerHTML = `<h5>No hay productos en tu carrito</h5>`;
      carrito = [];
      localStorage.setItem("totalAcomulado", JSON.stringify([]));
      localStorage.setItem("carrito", JSON.stringify(carrito));
      document.querySelector(".totalAcomulado").textContent = 0;
    }
  }
});
botonComprar.addEventListener("click", (e) => {
  console.log(botonComprar);
  swal("Compra realizada con exito");
  botonComprar.reset();
});
