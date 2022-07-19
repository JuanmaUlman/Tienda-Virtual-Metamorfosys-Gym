import { actualizarCarrito, carrito, total } from "./js-tienda/tienda.js";
console.log("test")
const form = document.getElementById("form");
const subTotal = document.getElementById("subTotal");
const cantidadDeCuotas = document.getElementById("cantidadDeCuotas")
const cuotas = document.getElementById("cuotas");
const envio = document.getElementById("envio");
const totalAPagar = document.querySelector("#totalAPagar");
console.log(totalAPagar);

const carritoStorage = JSON.parse(localStorage.getItem("carrito"));

// totalAPagar.textContent = carritoStorage.reduce((acc, prod) => acc += prod.precio * prod.cantidad, 0)
subTotal.textContent = '$'+ carritoStorage.reduce((acc, prod) => acc += prod.precio * prod.cantidad, 0)


// agregamos un listener al formulario para poder obtener los datos al momento de ser enviados
form.addEventListener("click", (e) => {
  e.preventDefault();


  
  pintarResumen();
})
  // Creamos un objetos con los valores para poder iterarlos
  
  // console.log(resumen)

  const pintarResumen = () => {
    envio.textContent = subTotal > 4000 ? 0:900;
    totalAPagar.textContent = +subTotal + +envio;  
    // cuotas.textContent = cantidadDeCuotas;
    console.log(envio, totalAPagar, cuotas);
    debugger

    // subTotal.textContent = `$${resumen.subTotal}`;

  };



  // envio.textContent=
  // if( subTotal > 4000 ){
  //   envio = 0
  // }else{
  //   envio = 900
  // }

