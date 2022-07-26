

const form = document.getElementById("form");
const subTotal = document.getElementById("subTotal");
const cantidadCuotas = document.getElementById("cantidadCuotas")
const cuotas = document.getElementById("cuotas");
const envio = document.getElementById("envio");
const totalAPagar = document.querySelector("#totalAPagar");



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
form.addEventListener("submit", (e) => {
  e.preventDefault();

  pintarResumen();

  //Mediante el click en el boton listo (y si todo esta validado), aparece el boton pagar en el resumen de la compra
  if(campos.nombre && campos.apellido && campos.email && campos.direccion){
    
    document.getElementById('btn-pagar').classList.remove('boton-pagar');
    document.getElementById('btn-pagar').classList.add('boton-pagar-visible');

  }
});



const pintarResumen = () => {
  const { carritoSubTotal, productosCantidad, calcularEnvio } =
    valorCarrito(carritoStorage);

  envio.textContent = "$"+calcularEnvio;
  totalAPagar.textContent = `$` + ( carritoSubTotal + calcularEnvio);
  cuotas.textContent = +cantidadCuotas.value+ " X " +"$"+ (carritoSubTotal + calcularEnvio) / +cantidadCuotas.value;
  // console.log({ carritoSubTotal, productosCantidad });
  // debugger;


};










//Expresion regular para validar el formulario

const expresiones = {
	direccion: /^[a-zA-Z0-9\s]{1,40}$/, // Letras, numeros, espacios
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,

}


const campos = {
  nombre: false,
  apellido: false,
  email: false,
  direccion:false
  
}


const inputs = document.querySelectorAll('#form input');

const validarFormulario = (e) => {
  switch(e.target.name){
    case "nombre":
    validarCampo(expresiones.nombre, e.target, 'nombre')
    break
    case "apellido":
      validarCampo(expresiones.apellido, e.target, 'apellido')

    break
    case "email":
      validarCampo(expresiones.email, e.target, 'email')

    break
    case "direccion":
      validarCampo(expresiones.direccion, e.target, 'direccion')

    break
  }
}

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
    document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
    document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
    document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
    campos[campo] = true;
    
  }else{
    document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
    document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
    document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
    document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
    campos[campo] = false;

  }
}



inputs.forEach((input) => {
  input.addEventListener('keyup', validarFormulario);
  input.addEventListener('blur', validarFormulario);
  
})

// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   console.log('la info llega')

//   if(campos.nombre && campos.apellido && campos.email && campos.direccion){
    
//     document.getElementById('btn-pagar').classList.remove('boton-pagar');
//     document.getElementById('btn-pagar').classList.add('boton-pagar-visible');
//     console.log('la info llega')
//   }
// })





