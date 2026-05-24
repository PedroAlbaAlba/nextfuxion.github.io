async function cargarProductos(){

const contenedor =
document.getElementById(
"productos"
);

contenedor.innerHTML = `
<div class="card">
<h3>Sincronización FuXion Colombia</h3>

<p>Pais: Colombia</p>

<p>Estado: Preparando conexión</p>

<a href="${CONFIG.buyUrl}">
Comprar
</a>

</div>
`;

}

cargarProductos();
