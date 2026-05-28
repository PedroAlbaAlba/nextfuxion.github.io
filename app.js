let productosGlobal = [];

/* CARGAR PRODUCTOS */

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

console.log(error);

}

}

/* CONVERTIR PRECIO */

function precioNumero(p){

return Number(

String(p.precio)

.replace("$","")

.replace(/\./g,"")

.replace(",", ".")

.replace(/[^\d.]/g,"")

)||0;

}

/* BUSCADOR */

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

/* ORDEN */

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

/* MOSTRAR PRODUCTOS */

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
onclick="verProducto('${p.link}'); return false;">

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

/* DETALLE */

function abrirDetalle(p){

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

/* CERRAR */

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

/* VER PRODUCTO */

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

console.log(error);

alert(
"Error abriendo producto"
);

}

}

/* INICIO */

cargarProductos();

/* ==========================
CARRITO DE COMPRAS
========================== */

function agregarAlCarrito(producto){

let carrito =
JSON.parse(
localStorage.getItem("carrito")
)||[];

const existente =
carrito.find(
p=>p.link===producto.link
);

if(existente){

existente.cantidad++;

}else{

carrito.push({

nombre:producto.nombre,
precio:producto.precio,
imagen:producto.imagen,
link:producto.link,
cantidad:1

});

}

localStorage.setItem(
"carrito",
JSON.stringify(carrito)
);

actualizarContador();

alert(
producto.nombre +
" agregado al carrito"
);

}

function actualizarContador(){

const carrito =
JSON.parse(
localStorage.getItem("carrito")
)||[];

const total =
carrito.reduce(
(acc,p)=>
acc+p.cantidad,
0
);

const contador =
document.getElementById(
"contadorCarrito"
);

if(contador){

contador.textContent =
total;

}

}
