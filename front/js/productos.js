const contenedor = document.getElementById('productsList');
const paginacion = document.getElementById('pagination');
const limit = 9;
let paginaActual = 1;

async function cargarProductos(page = 1) {
    try {
        const response = await fetch(`https://mevistocomoquiero.onrender.com/api/products?page=${page}&limit=${limit}`);
        if (!response.ok) throw new Error('Error al cargar los productos');

        const data = await response.json();
        const productos = data.payload;

        console.log(productos)

        contenedor.innerHTML = '';

        productos.forEach(producto => {
            const productoHTML = `
                <div class="producto-card">
                    <div class="producto-imagen">
                        <img src="${producto.imagen || 'img/placeholder.jpg'}" alt="${producto.title}">
                    </div>
                    <div class="producto-info">
                        <h3 class="producto-nombre">${producto.title}</h3>
                        <p class="producto-precio">$${producto.price}</p>
                    </div>
                </div>
            `;
            contenedor.insertAdjacentHTML('beforeend', productoHTML);
        });

        renderizarPaginacion(data.totalPages, data.page);

    } catch (error) {
        console.error('Error al cargar productos:', error);
        contenedor.innerHTML = `<div class="alert alert-danger">Error al cargar los productos.</div>`;
    }
}

function renderizarPaginacion(totalPages, currentPage) {
    paginacion.innerHTML = '';

    const prevBtn = document.createElement('li');
    prevBtn.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevBtn.innerHTML = `<a class="page-link" href="#">Anterior</a>`;
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            cargarProductos(currentPage - 1);
        }
    });
    paginacion.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
        pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageItem.addEventListener('click', () => {
            cargarProductos(i);
        });
        paginacion.appendChild(pageItem);
    }

    const nextBtn = document.createElement('li');
    nextBtn.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextBtn.innerHTML = `<a class="page-link" href="#">Siguiente</a>`;
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            cargarProductos(currentPage + 1);
        }
    });
    paginacion.appendChild(nextBtn);
}

document.addEventListener('DOMContentLoaded', () => {
    cargarProductos(paginaActual);
});
