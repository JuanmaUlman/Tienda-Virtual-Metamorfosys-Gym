import { getData } from "./getData.js";


const contenedorCarrito = document.getElementById('carritoContenedor')
const contenedorProductos = document.getElementById("contenedorProductos")
const contadorCarrito = document.getElementById("contadorCarrito");
const vaciar = document.getElementById("vaciar");
export const total = document.getElementById("total");

// const deMayor = document.getElementById("deMayor");



//Usando fecth()
const productos = await getData() // anteriormente la tenia declarada dentro de la función mostrarProductos, pero al invocarla en la funcion agregar al carrito y usarla con un find(), me aparecia en el console log que no era una funcion, asi que opte por declarla fuera de esta función


//CREAR HTML INSERTANDO LOS PRODUCTOS
const mostrarProductos = async () => {

    contenedorProductos.innerHTML = ``
    

    productos.forEach( (producto) => {
        const div = document.createElement('div')
        div.classList.add('card')
        div.classList.add('col-md-3')
        div.classList.add('col-lg-3')
        div.classList.add('m-3')
        div.classList.add('divCard')

        div.innerHTML = `
        <img src=${producto.img} class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.desc}</p>
            <button id="agregarCarrito${producto.id}" class="agregar btn btn-primary me-2">Agregar al carrito</button> <span>$${producto.precio}</span>
        </div>
        `

        contenedorProductos.appendChild(div)
       




        

        //BOTON AGREGAR AL CARRITO CON EVENTO CLICK
        const boton = document.getElementById(`agregarCarrito${producto.id}`);
        boton.addEventListener('click', () => {
            agregarAlCarrito(producto.id);


        //Aqui aplicamos libreria Tostify para añadir un producto al carrito
        Toastify({
            text: "Has agregado un producto al carrito",
            duration: 3000,
            gravity: "bottom",
            style: {
                background: "rgba(205,1,1,1)" 
            }
        }).showToast();
        });

    })

}


//llamamos a la funcion y mostramos los productos(cards) que ingrese en el html a traves de javascript
mostrarProductos();


//CARGAR PRODUCTOS AL CARRITO
export let carrito = [];


// aqui le damos el evento click al boton del modal que sirve para vaciar los productos en el carrito, una vez echo el click se llama a la funcion actualizarCarrito()




//Boton comprar en el modal, que me redirecciona a otro html
// const botonComprar = document.getElementById("comprar");

// botonComprar.addEventListener("click", () => {

//     location.replace('http://127.0.0.1:5500/pasarelaDePago.html')
// })




const agregarAlCarrito = (prodId) =>{

    //en primer paso nos fijamos si el producto ya fue agregado al carrito, en este caso use some, esta funcion realizara una busqueda por comparacion y devolvera un valor booleano dependiendo de si el producto fue agregado o no
const yaFueAgregado = carrito.some(prod => prod.id === prodId)

//si some devuelve true, entrara al condicional y usaremos la funcion map, esta creara un nuevo array con los elementos del original y sera transformado segun el parametro que le pasamos, en este caso la constante yaFueAgregado (que tiene la funcion some), una vez que cree el nuevo array, lo itere y encuentre que producto esta duplicado, se le pide que se le sume la cantidad, y si no esta duplicado, que lo sume al carrito, luego actualizamos el carrito con la funcion actualizarCarrito()
if(yaFueAgregado){
    const elemento = carrito.map(prod => {
        if (prod.id === prodId){
            prod.cantidad++
        }
    })
}else{
        const item = productos.find((prod) => prod.id === prodId)  
        carrito.push(item);
}

actualizarCarrito();
    
}




const eliminarDelCarrito= (prodId) => {

    const item = carrito.find((prod) => prod.id === prodId)
    const indiceDelItem = carrito.indexOf(item)
    carrito.splice(indiceDelItem, 1)
    actualizarCarrito();
}



//Actualizar carrito es llamada cuando se agrega un producto al carrito
export const actualizarCarrito = () => {

//Cada vez que llame a la funcion, lo primero es borrar el nodo, ya que se me acumulaban los productos excesivamente con cada evento click que hacia

    contenedorCarrito.innerHTML = ""


    carrito.forEach((prod) => {
        const div = document.createElement("DIV") 
        div.className = (`productoEnCarrito`)
        div.innerHTML= `
        <p>${prod.nombre}</p>
        <p>${prod.precio}</p>
        <p>Cantidad: <span id=cantidad>${prod.cantidad}</span></p>
        <button id="eliminarDelCarrito${prod.id}"><i class="fas fa-trash-alt"></i></button>
        `
        
        contenedorCarrito.appendChild(div);

        //boton para eliminar productos del carrito, le agregamos sweetAlert
        const boton = document.getElementById(`eliminarDelCarrito${prod.id}`);
        boton.addEventListener('click', () => {

            //Aqui aplicamos libreria sweetAlert, en el boton eliminar carrito
            swal({
                title: '¿Estas seguro/a de eliminar los productos del carrito?',
                icon: 'warning',
                buttons: true,
                dangerMode: true

            }).then((result) => {


                //para simplicaficar el codigo, utilizo un operador logico AND
                result && swal({
                            title: 'Borrado',
                            icon:'success',
                            text: 'El producto ha sido borrado del carrito'
                            })

                // if(result){
                //     swal({
                //         title: 'Borrado',
                //         icon:'success',
                //         text: 'El producto ha sido borrado del carrito'
                //     })
                    eliminarDelCarrito(prod.id);
                })
            })


        })



        //guardamos en el localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));


    
        //modificamos el contador del carrito al cargarse los productos
        contadorCarrito.innerText = "Carrito"+"("+carrito.length+")"


        //modificamos el total acumulado en relacion a precio, en el carrito
        total.innerText = carrito.reduce((acc, prod) => acc += prod.precio * prod.cantidad, 0) //prod.precio * prod.cantidad para que al cargar 2 productos iguales tambien sume la cantidad en el total de la funcion agregarAlCarrito()
        return total;
    }



//una vez que el documento este cargado (DOMContentLoaded), llamamos al local storage  y lo parseamos
document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito();
    }
    
})

//     //Evento que filtra y ordena el dom segun se lo indique (de menor a mayor o viceversa, segun el precio)
//     const ordenar = document.getElementById("ordenar");
//     ordenar.addEventListener('change', (e) => {
//         switch(e.target.value){
//             case "menor":
//                 console.log("menor a mayor");
//                 productos.sort((a, b) => a.precio - b.precio );
//                 break;
//             case "mayor":
//                 console.log("mayor a menor");
//                 productos.sort((a, b) => b.precio - a.precio );
//                 break;
//                 default:
//                     console.log("orden por default");
//                     break;
//         }
//     mostrarProductos();
//     })




// vaciar.addEventListener("click", () =>{
//     carrito.length = 0
//     total.innerText = 0
//     actualizarCarrito();
// } )