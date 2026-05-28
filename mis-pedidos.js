const pedidos =

JSON.parse(
localStorage.getItem(
"pedidos"
)
) || [];

const contenedor =
document.getElementById(
"listaPedidos"
);

if(
pedidos.length===0
){

contenedor.innerHTML =

`

<div class="card">

<h3>

No tienes pedidos registrados

</h3>

<p>

Cuando realices tu primera compra aparecerá aquí.

</p>

</div>

`;

}else{

const pedidosOrdenados =

[...pedidos]
.reverse();

pedidosOrdenados.forEach(
pedido=>{

contenedor.innerHTML += `

<div class="card">

<h3>

${pedido.numero}

</h3>

<p>

📅 ${pedido.fecha}

</p>

<p>

👤 ${pedido.cliente.nombre}

</p>

<p>

📦 ${pedido.productos.length} productos

</p>

<p>

💰 $${pedido.total.toLocaleString("es-CO")}

</p>

<p>

Estado:

<strong>

${pedido.estado}

</strong>

</p>

<button
onclick='verDetalle(${JSON.stringify(pedido)})'>

Ver detalle

</button>

</div>

`;

});

}

function verDetalle(
pedido
){

let html =

`

<h2>

${pedido.numero}

</h2>

<p>

📅 ${pedido.fecha}

</p>

<p>

👤 ${pedido.cliente.nombre}

</p>

<p>

📱 ${pedido.cliente.telefono}

</p>

<p>

📍 ${pedido.cliente.ciudad}

</p>

<hr>

<h3>

Productos

</h3>

`;

pedido.productos.forEach(
p=>{

html += `

<p>

${p.cantidad} x ${p.nombre}

</p>

`;

});

html += `

<hr>

<h3>

💰 Total:

$${pedido.total.toLocaleString("es-CO")}

</h3>

<p>

Estado:

${pedido.estado}

</p>

`;

document.getElementById(
"modalContenido"
).innerHTML =
html;

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
