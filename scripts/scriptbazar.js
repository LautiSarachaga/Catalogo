const productos = [
    { nombre: "Vaso doble tapa", precio: 18000, imagen: "imagenes/producto1.jpeg" },
    { nombre: "Vaso con destapador", precio: 18000, imagen: "imagenes/producto2.jpeg" },
    { nombre: "Cartera 1", precio: 15000, imagen: "imagenes/producto3.jpeg" },
    { nombre: "Cartera 2", precio: 20000, imagen: "imagenes/producto4.jpeg" },
    { nombre: "Mochila chica femenina", precio: 24000, imagen: "imagenes/producto5.jpeg" },
    { nombre: "Mochila grande", precio: 30000, imagen: "imagenes/producto6.jpeg" },

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
    const producto = productos[index];
    
    // Buscar si el producto ya está en el carrito
    const productoEnCarrito = carrito.find(item => item.nombre === producto.nombre);

    if (productoEnCarrito) {
        // Si ya está, incrementar la cantidad
        productoEnCarrito.cantidad += 1;
    } else {
        // Si no está, agregarlo al carrito con cantidad 1
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
}

function actualizarCarrito() {
    cartDiv.innerHTML = `
        <h2 class="font-bold text-lg mb-2">Carrito</h2>
        ${carrito.map((producto, index) => `
            <div class="mb-2 flex justify-between items-center">
                <span>${producto.nombre} - $${producto.precio} x ${producto.cantidad}</span>
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
    
    // Información de la factura
    const nombreNegocio = "Negocio de Zaira"; // Nombre del negocio
    const fechaFactura = new Date().toLocaleDateString(); // Fecha actual

    // Agregar el encabezado de la factura
    pdfContent.innerHTML = `
        <h2>${nombreNegocio}</h2>
        <p><strong>Factura</strong></p>
        <p><strong>Fecha:</strong> ${fechaFactura}</p>
        <hr />
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
                <tr>
                    <th style="border: 1px solid #000; padding: 5px; text-align: left;">Producto</th>
                    <th style="border: 1px solid #000; padding: 5px; text-align: left;">Precio Unitario</th>
                    <th style="border: 1px solid #000; padding: 5px; text-align: left;">Cantidad</th>
                    <th style="border: 1px solid #000; padding: 5px; text-align: left;">Total</th>
                </tr>
            </thead>
            <tbody>
    `;

    let totalFactura = 0;

    carrito.forEach(producto => {
        const totalProducto = producto.precio * producto.cantidad;
        totalFactura += totalProducto;
    
        pdfContent.innerHTML += `
            <tr>
               <td style="border: 1px solid #000; padding: 10px; text-align: left;">${producto.nombre}</td>
                <td style="border: 1px solid #000; padding: 10px; text-align: right;">$${producto.precio}</td>
                <td style="border: 1px solid #000; padding: 10px; text-align: center;">${producto.cantidad}</td>
                <td style="border: 1px solid #000; padding: 10px; text-align: right;">$${totalProducto}</td>
            </tr>
            <br>
        `;
    });


    pdfContent.innerHTML += `
            </tbody>
        </table>
        <p><strong>Total: $${totalFactura}</strong></p>
    `;

    // Verificar el contenido generado
    console.log(pdfContent.innerHTML);

    // Generar el PDF
    html2pdf().from(pdfContent).save();
}

// Renderizar productos al cargar la página
renderProductos();
