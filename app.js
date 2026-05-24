
async function cargarProductos(){

const res = await fetch("productos.json");

const productos = await res.json();

const contenedor =
document.getElementById(
"productos"
);

if(!contenedor) return;

productos.forEach(p=>{

contenedor.innerHTML += `
<div class="card">

<img src="${p.imagen}">

<h3>${p.nombre}</h3>

<p>${p.categoria}</p>

<h4>${p.precio}</h4>

<a href="${p.link}">
Comprar
</a>

</div>
`;

});

}

cargarProductos();
