import { actualizarCarrito, carrito, total } from "./tienda.js";
console.log("test")
const form = document.getElementById("form");
const subTotal = document.getElementById("subTotal");
const cantidadCuotas = document.getElementById("cantidadCuotas")
const cuotas = document.getElementById("cuotas");
const envio = document.getElementById("envio");
const totalAPagar = document.querySelector("#totalAPagar");
console.log(totalAPagar);

// const carritoStorage = JSON.parse(localStorage.getItem("carrito"));

// totalAPagar.textContent = carritoStorage.reduce((acc, prod) => acc += prod.precio * prod.cantidad, 0)
// subTotal.textContent = '$'+ carritoStorage.reduce((acc, prod) => acc += prod.precio * prod.cantidad, 0)


// // agregamos un listener al formulario para poder obtener los datos al momento de ser enviados
// form.addEventListener("click", (e) => {
//   e.preventDefault();


  
//   pintarResumen();
// })
//   // Creamos un objetos con los valores para poder iterarlos
  
//   // console.log(resumen)

//   const pintarResumen = () => {
//     envio.textContent = subTotal > 4000 ? 0:900;
//     totalAPagar.textContent = +subTotal + +envio;  
//     // cuotas.textContent = cantidadDeCuotas;
//     console.log(envio, totalAPagar, cuotas);
//     debugger

//     // subTotal.textContent = `$${resumen.subTotal}`;

//   };



  // envio.textContent=
  // if( subTotal > 4000 ){
  //   envio = 0
  // }else{
  //   envio = 900
  // }
















  // const carritoStorage = JSON.parse(localStorage.getItem("carrito"));

// const valoresCarrito = (carrito) => {
//   // let productsQuantity = 0;
//   // let cartSubTotal = 0;

//   // cart.forEach((product) => {
//   //   productsQuantity += product.cantidad;
//   //   cartSubTotal += product.precio * product.cantidad;
//   // });
//   let envios = subTotal > 4000 ? 0 : 900;

//   return { envios };
// };

// // totalAPagar.textContent = carritoStorage.reduce((acc, prod) => acc += prod.precio * prod.cantidad, 0)
// subTotal.textContent =
//   "$" +
//   carritoStorage.reduce((acc, prod) => (acc += prod.precio * prod.cantidad), 0);

// // agregamos un listener al formulario para poder obtener los datos al momento de ser enviados
// form.addEventListener("click", (e) => {
//   e.preventDefault();

//   pintarResumen();
// });
// // Creamos un objetos con los valores para poder iterarlos

// // console.log(resumen)

// const pintarResumen = () => {
//   const {envios } =
//     valoresCarrito(carritoStorage);

//   envio.textContent = envios;
//   totalAPagar.textContent = subTotal + shipping;
//   cuotas.textContent = +cantidadCuotas.value;
//   // console.log({SubTotal, productsQuantity });
//   debugger;

//   // subTotal.textContent = `$${resumen.subTotal}`;
// };






const carritoStorage = JSON.parse(localStorage.getItem("carrito"));

const valorCarrito = (carrito) => {
  let productosCantidad = 0;
  let carritoSubTotal = 0;

  carrito.forEach((producto) => {
    productosCantidad += producto.cantidad;
    carritoSubTotal += producto.precio * producto.cantidad;
  });
  let calcularEnvio = carritoSubTotal > 4000 ? 0 : 900;

  return { productosCantidad, carritoSubTotal, calcularEnvio };
};

// totalAPagar.textContent = carritoStorage.reduce((acc, prod) => acc += prod.precio * prod.cantidad, 0)
subTotal.textContent =
  "$" +
  carritoStorage.reduce((acc, prod) => (acc += prod.precio * prod.cantidad), 0);

// agregamos un listener al formulario para poder obtener los datos al momento de ser enviados
form.addEventListener("click", (e) => {
  e.preventDefault();

  pintarResumen();
});
// Creamos un objetos con los valores para poder iterarlos

// console.log(resumen)

const pintarResumen = () => {
  const { carritoSubTotal, productosCantidad, calcularEnvio } =
    valorCarrito(carritoStorage);

  envio.textContent = "$"+calcularEnvio;
  totalAPagar.textContent = `$` + ( carritoSubTotal + calcularEnvio);
  cuotas.textContent = +cantidadCuotas.value+ " X " +"$"+ (carritoSubTotal + calcularEnvio) / +cantidadCuotas.value;
  console.log({ carritoSubTotal, productosCantidad });
  debugger;


};


