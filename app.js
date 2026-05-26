let productosGlobal = [];

async function cargarProductos(){

const contenedor =
document.getElementById(
"productos"
);

contenedor.innerHTML =
"<p>Cargando...</p>";

try{

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

}catch(error){

contenedor.innerHTML =
"<p>Error cargando catálogo</p>";

console.error(error);

}

}

function precioNumero(p){

return Number(
String(
p.precio
)
.replace(
"$",
""
)
.replace(
/\./g,
""
)
.replace(
",",
"."
)
.replace(
/[^\d.]/g,
""
)
)||0;

}

function activarBusqueda(){

const buscador =
document.getElementById(
"busqueda"
);

if(!buscador)return;

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
.includes(
texto
)

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

if(!selector)return;

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

precioNumero(a)
-
precioNumero(b)

);

}

if(
e.target.value==="desc"
){

copia.sort(
(a,b)=>

precioNumero(b)
-
precioNumero(a)

);

}

mostrarProductos(
copia
);

}

);

}

/* ABRIR PRODUCTO */


setTimeout(()=>{

try{

ventana.location =
url;

}catch(e){

console.log(e);

}

},2000);

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
alt="${p.nombre}"
onclick='abrirDetalle(${JSON.stringify(p)})'>

<h3>

${p.nombre}

</h3>

<h4>

${p.precio}

</h4>

<div class="card-buttons">

<a
class="btn-view"
href="./redirect.html?url=${encodeURIComponent(p.link)}"
target="_blank"
return false;
">

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
).innerHTML = `

<img
src="${p.imagen}"
style="
width:220px;
max-width:100%;
border-radius:12px;
">

<h2>

${p.nombre}

</h2>

<h3>

${p.precio}

</h3>

<br>

<a
class="btn-buy"
target="_blank"
href="https://wa.me/573002117268?text=Hola quiero comprar ${encodeURIComponent(p.nombre)}">

Comprar

</a>

`;

document.getElementById(
"modal"
).style.display =
"flex";

}

function cerrarModal(){

document.getElementById(
"modal"
).style.display =
"none";

}

window.onclick =
function(e){

const modal =
document.getElementById(
"modal"
);

if(
e.target===modal
){

cerrarModal();

}

};

cargarProductos();
