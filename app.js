let productosGlobal = [];

async function cargarProductos(){

const contenedor =
document.getElementById(
"productos"
);

contenedor.innerHTML =
"<p>Cargando...</p>";

const respuesta =
await fetch(
"./productos.json"
);

productosGlobal =
await respuesta.json();

mostrarProductos(
productosGlobal
);

activarBusqueda();

activarOrden();

}

function precioNumero(p){

return Number(
String(p.precio)
.replace("$","")
.replace(/\./g,"")
.replace(",",".")
.replace(/[^\d.]/g,"")
)||0;

}

function activarBusqueda(){

const buscador =
document.getElementById(
"busqueda"
);

buscador.addEventListener(
"input",
e=>{

const texto =
e.target.value
.toLowerCase();

const lista =
productosGlobal.filter(
x=>
x.nombre
.toLowerCase()
.includes(texto)
);

mostrarProductos(
lista
);

}
);

}

function activarOrden(){

const selector =
document.getElementById(
"orden"
);

selector.addEventListener(
"change",
e=>{

let copia =
[
...productosGlobal
];

if(
e.target.value==="asc"
){

copia.sort(
(a,b)=>
precioNumero(a)-
precioNumero(b)
);

}

if(
e.target.value==="desc"
){

copia.sort(
(a,b)=>
precioNumero(b)-
precioNumero(a)
);

}

mostrarProductos(
copia
);

}
);

}

function mostrarProductos(
productos
){

const contenedor =
document.getElementById(
"productos"
);

contenedor.innerHTML="";

productos.forEach(p=>{

const mensaje =
encodeURIComponent(
`Hola, quiero comprar ${p.nombre} desde NextFuXion.`
);

contenedor.innerHTML += `

<div class="card">

<img
src="${p.imagen}"
onclick='abrirDetalle(${JSON.stringify(p)})'>

<h3>${p.nombre}</h3>

<h4>${p.precio}</h4>

<div class="card-buttons">

<a
class="btn-view"
href="${p.link}"
target="_blank">

Ver producto

</a>

<a
class="btn-buy"
target="_blank"
href="https://wa.me/573002117268?text=${mensaje}">

Comprar

</a>

</div>

</div>

`;

});

}

function abrirDetalle(
p
){

document.getElementById(
"modalContenido"
).innerHTML=`

<img
src="${p.imagen}"
style="
width:220px;
max-width:100%;
">

<h2>${p.nombre}</h2>

<h3>${p.precio}</h3>

<a
class="btn-buy"
target="_blank"
href="https://wa.me/573002117268?text=Hola quiero comprar ${encodeURIComponent(p.nombre)}">

Comprar

</a>

`;

document.getElementById(
"modal"
).style.display=
"flex";

}

function cerrarModal(){

document.getElementById(
"modal"
).style.display=
"none";

}

cargarProductos();
