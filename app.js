let productosGlobal = [];

async function cargarProductos() {

const contenedor =
document.getElementById(
"productos"
);

contenedor.innerHTML =
"<p>Cargando productos...</p>";

try {

const respuesta =
await fetch(
"./productos.json"
);

productosGlobal =
await respuesta.json();

mostrarProductos(
productosGlobal
);

/* activar buscador */

const buscador =
document.getElementById(
"busqueda"
);

if (buscador) {

buscador.addEventListener(
"input",
function(e){

const texto =
e.target.value
.toLowerCase();

const filtrados =
productosGlobal.filter(
p =>
(p.nombre || "")
.toLowerCase()
.includes(texto)
);

mostrarProductos(
filtrados
);

}
);

}

}
catch(error){

console.log(error);

contenedor.innerHTML =
`
<p>
Error cargando catálogo
</p>
`;

}

}

function mostrarProductos(productos){

const contenedor =
document.getElementById(
"productos"
);

contenedor.innerHTML = "";

productos.forEach(p=>{

const mensaje =
encodeURIComponent(
`Hola, quiero comprar ${p.nombre} desde NextFuXion.`
);

contenedor.innerHTML += `

<div class="card">

<img
src="${p.imagen}"
alt="${p.nombre}">

<h3>
${p.nombre}
</h3>

<p>
${p.categoria || "FuXion"}
</p>

<h4>
${p.precio}
</h4>

<div class="card-buttons">

<a
class="btn-view"
href="${p.link}"
target="_blank">

Ver producto

</a>

<a
class="btn-buy"
href="https://wa.me/573002117268?text=${mensaje}"
target="_blank">

Comprar WhatsApp

</a>

</div>

</div>

`;

});

}

cargarProductos();
