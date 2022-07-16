import { actualizarCarrito, carrito, total } from "./js-tienda/tienda.js";

const subTotal = document.getElementById("subTotal");
const cuotas = document.getElementById("cuotas");
const envio = document.getElementById("envio");
const totalAPagar = document.getElementById("totalAPagar");

// actualizarCarrito()
carrito;

  // Creamos un objetos con los valores para poder iterarlos
  const resumen = {
    subTotal: total,
    cuotas: cuotas,
    envio: envio,
    totalAPagar: total + envio
  };


  const pintarResumen = (resumen) => {
    subTotal.textContent = `$${resumen.subTotal}`;

  };

  pintarResumen(resumen);