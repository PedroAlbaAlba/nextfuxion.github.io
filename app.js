async function cargarProductos(){

const contenedor =
document.getElementById(
"productos"
);

contenedor.innerHTML =
"<p>Cargando productos...</p>";

try{

const respuesta =
await fetch(
"productos.json"
);

const productos =
await respuesta.json();

contenedor.innerHTML = "";

productos.forEach(p=>{

contenedor.innerHTML += `

<div class="card">

<img
src="${p.imagen}"
alt="${p.nombre}">

<h3>
${p.nombre}
</h3>

<p>
${p.categoria}
</p>

<h4>
${p.precio}
</h4>

<a
href="${p.link}"
target="_blank">

Comprar

</a>

</div>

`;

});

}catch(error){

contenedor.innerHTML = `
<p>
Error cargando catálogo
</p>
`;

}

}

cargarProductos();
