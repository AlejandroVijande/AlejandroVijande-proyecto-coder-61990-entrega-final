let productosCarrito = localStorage.getItem("productos-en-carrito");
productosCarrito = JSON.parse(productosCarrito);

const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoAcciones = document.querySelector("#contenedor-carrito-acciones");
const carritoComprado = document.querySelector("#carrito-comprado");
let btnEliminarProducto = document.querySelectorAll(".carrito-producto-eliminar")
const btnVaciarCarrito = document.querySelector("#carrito-vaciar");
const carritoTotal = document.querySelector("#total");
const btnComprarCarrito = document.querySelector("#carrito-comprar");



function cargarProductosCarrito() {
    if (productosCarrito && productosCarrito.length > 0) {

        carritoVacio.classList.add("disabled");
        carritoProductos.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");
        carritoComprado.classList.add("disabled");

        carritoProductos.innerHTML = "";

        productosCarrito.forEach(producto => {

            const tarjeta = document.createElement("div");
            tarjeta.classList.add("carrito-producto");
            tarjeta.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.marca} ${producto.modelo}" >
                <div class="carrito-producto-marca-modelo">
                    <small>Artículo</small>
                    <h2>${producto.marca} ${producto.modelo}</h2>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash3"></i></button>   
            `;

            carritoProductos.append(tarjeta);
        })

    } else {

        carritoVacio.classList.remove("disabled");
        carritoProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
        carritoComprado.classList.add("disabled");
    }

    actualizarBtnEliminarProducto()
    calcularTotal()
}

cargarProductosCarrito()



function actualizarBtnEliminarProducto() {
    productoEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    productoEliminar.forEach(btn => {
        btn.addEventListener("click", eliminarProductoCarrito);
    });
}


function eliminarProductoCarrito(e) {
    Toastify({
        text: "PRODUCTO ELIMINADO",
        duration: 3000,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #085364,#288aa0,#0ac8c2)",
            borderRadius: "1rem",
            fontSize: '1rem'
        },
        offset: {
            x: "1rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: "3.4rem" // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        onClick: function () { } // Callback after click
    }).showToast();
    
    const idBtn = parseInt(e.currentTarget.id);
    const productoEliminado = productosCarrito.find(producto => producto.id === idBtn);
    const index = productosCarrito.findIndex(producto => producto.id === idBtn);

    productosCarrito.splice(index, 1);
    cargarProductosCarrito()

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito));

}



btnVaciarCarrito.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire({
        title: "<strong>¿Estas seguro?</u></strong>",
        icon: "question",
        html: `
          Se borraran <b>todos</b> los productos del carrito.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `Si`,
        cancelButtonText: `No`,
        confirmButtonColor: "#a7b1b1",
        cancelButtonColor: "#288aa0",
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            productosCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito));
            cargarProductosCarrito()
        }
    });
    
}


function calcularTotal() {
    const totalCalculado = productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}


btnComprarCarrito.addEventListener("click", comprarCarrito)
function comprarCarrito() {
    productosCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito));
    carritoVacio.classList.add("disabled");
    carritoProductos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
    carritoComprado.classList.remove("disabled");
}