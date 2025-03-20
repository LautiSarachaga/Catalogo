const productos = [
    { nombre: "Producto 1", precio: 100, imagen: "imagenes/producto1.jpeg" },
    { nombre: "Producto 2", precio: 150, imagen: "imagenes/producto2.jpeg" },
    { nombre: "Producto 3", precio: 200, imagen: "imagenes/producto3.jpeg" },
    { nombre: "Producto 4", precio: 250, imagen: "imagenes/producto4.jpeg" },
    { nombre: "Producto 5", precio: 300, imagen: "imagenes/producto5.jpeg" },
    { nombre: "Producto 6", precio: 350, imagen: "imagenes/producto6.jpeg" },
    { nombre: "Producto 7", precio: 400, imagen: "imagenes/producto.jpeg" },
    { nombre: "Producto 8", precio: 450, imagen: "imagenes/producto.jpeg" }
];

const carrito = [];
const productList = document.getElementById('product-list');
const cartDiv = document.getElementById('cart');

function renderProductos() {
    productos.forEach((producto, index) => {
        const productCard = document.createElement('div');
        productCard.className = "product-card";

        productCard.innerHTML = `
            <div class="product-image">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="object-cover h-full w-full">
            </div>
            <h2 class="font-bold text-lg">${producto.nombre}</h2>
            <p class="text-gray-600">$${producto.precio}</p>
            <button onclick="agregarAlCarrito(${index})" class="bg-blue-500 text-white mt-2 px-4 py-2 rounded">Agregar al carrito</button>
        `;
        productList.appendChild(productCard);
    });
}

function agregarAlCarrito(index) {
    carrito.push(productos[index]);
    actualizarCarrito();
}

function actualizarCarrito() {
    cartDiv.innerHTML = `
        <h2 class="font-bold text-lg mb-2">Carrito</h2>
        ${carrito.map((producto, index) => `
            <div class="mb-2 flex justify-between items-center">
                <span>${producto.nombre} - $${producto.precio}</span>
                <button onclick="eliminarDelCarrito(${index})" class="text-red-500">X</button>
            </div>
        `).join('')}
        <button onclick="generarPDF()">Realizar Pedido</button>
    `;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function generarPDF() {
    const pdfContent = document.createElement('div');
    carrito.forEach(producto => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <div>
                <h3>${producto.nombre}</h3>
                <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100px; height: 100px;">
                <p>Precio: $${producto.precio}</p>
            </div>
        `;
        pdfContent.appendChild(productDiv);
    });

    html2pdf().from(pdfContent).save();
}

// Renderizar productos al cargar la página
renderProductos();
