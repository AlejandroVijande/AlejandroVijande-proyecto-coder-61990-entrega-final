let productos = [];

async function fetchProductos() {
  try {
    const response = await fetch("./js/productos.json");
    const data = await response.json();
    productos = data;
    cargarProductos(productos);
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}

const contenedorProductos = document.querySelector("#contenedor-productos");
let productoAgregar = document.querySelectorAll(".producto-agregar");

function cargarProductos() {
  productos.forEach(producto => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("producto");
    tarjeta.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="Guitarra ${producto.marca} ${producto.modelo}">
            <div class="producto-detalles">
                <h2 class="marca-modelo">${producto.marca} ${producto.modelo}</h2>
                <p class="precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar al carrito</button>
            </div>
        `;

    contenedorProductos.append(tarjeta);
  });
  actualizarProductosAgregar();
}

fetchProductos();

function actualizarProductosAgregar() {
  productoAgregar = document.querySelectorAll(".producto-agregar");

  productoAgregar.forEach(producto => {
    producto.addEventListener("click", agregarAlCarrito);
  });
}

let productosCarrito;

let productosCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosCarritoLS) {
  productosCarrito = JSON.parse(productosCarritoLS);
} else {
  productosCarrito = [];
}

function agregarAlCarrito(e) {
  Toastify({
    text: "PRODUCTO AGREGADO",
    duration: 3000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #085364,#288aa0,#0ac8c2)",
      borderRadius: "1rem",
      fontSize: '1rem'
    },
    offset: {
      x: "1rem",
      y: "3.4rem"
    },
    onClick: function () { }
  }).showToast();

  const idAgregar = parseInt(e.currentTarget.id);
  const productoAgregado = productos.find(producto => producto.id === idAgregar);

  if (productosCarrito.some(producto => producto.id === idAgregar)) {
    const index = productosCarrito.findIndex(producto => producto.id === idAgregar);
    productosCarrito[index].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productosCarrito.push(productoAgregado);
  }

  localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito));
}
