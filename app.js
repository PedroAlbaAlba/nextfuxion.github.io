let productosGlobal = [];

async function cargarProductos(){

const contenedor =
document.getElementById(
"productos"let productosGlobal = [];

/* =========================
   CARGAR PRODUCTOS
========================= */

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

console.log(
error
);

}

}

/* =========================
   CONVERTIR PRECIO
========================= */

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
"")

)||0;

}

/* =========================
   BUSCADOR
========================= */

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

/* =========================
   ORDENAR PRECIOS
========================= */

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

/* =========================
   MOSTRAR PRODUCTOS
========================= */

function mostrarProductos(
productos
){

const contenedor =
document.getElementById(
"productos"
);

contenedor.innerHTML="";

productos.forEach(
p=>{

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
href="#"

onclick="
verProducto(
'${p.link}'
);

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

<p
style="
font-size:12px;
margin-top:10px;
color:#aaa;
">

Buscar en FuXion:

<br>

${p.nombre}

</p>

</div>

`;

}

);

}

/* =========================
   MODAL DETALLE
========================= */

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

<p>

Buscar este nombre:

<br><br>

<strong>

${p.nombre}

</strong>

</p>

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

/* =========================
   CERRAR MODAL
========================= */

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

/* =========================
   VER PRODUCTO
========================= */

function verProducto(link){

try{

const codigo =
link.split(
"itemcode="
)[1];

if(!codigo){

alert(
"No se encontró itemcode"
);

return;

}

window.open(

`https://nextfuxion-api.pedroa-alba.workers.dev/?itemcode=${codigo}`,

"_blank"

);

}catch(error){

console.log(
error
);

alert(
"Error abriendo producto"
);

}

}

/* =========================
   INICIO
========================= */

cargarProductos();
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

console.log(
error
);

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

function mostrarProductos(
productos
){

const contenedor =
document.getElementById(
"productos"
);

contenedor.innerHTML="";

productos.forEach(
p=>{

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
href="#"
onclick="
verProducto(
'${p.link}'
);
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

<p style="
font-size:12px;
margin-top:10px;
color:#aaa;
">

Buscar en FuXion:

<br>

${p.nombre}

</p>

</div>

`;

}

);

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

<p>

Buscar este nombre en FuXion:

<br><br>

<strong>

${p.nombre}

</strong>

</p>

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
async function verProducto(url){

try{

const codigo =
url
.split(
"itemcode="
)[1];

const respuesta =
await fetch(

`./api/producto?itemcode=${codigo}`

);

const html =
await respuesta.text();

document.getElementById(
"modalContenido"
).innerHTML =
html;

document.getElementById(
"modal"
).style.display =
"flex";

}catch(error){

console.log(
error
);

alert(
"No se pudo cargar el producto"
);

}

}
function verProducto(link){

const codigo =
link.split(
"itemcode="
)[1];

window.open(

`https://nextfuxion-api.pedroa-alba.workers.dev/?itemcode=${codigo}`,

"_blank"

);

}
