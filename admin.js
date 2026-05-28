const pedidos =
JSON.parse(
localStorage.getItem("pedidos")
) || [];

const contenedor =
document.getElementById(
"ultimosPedidos"
);

let totalVentas = 0;

const clientes = {};

const productos = {};

let ventasHoy = 0;

const hoy =
new Date()
.toLocaleDateString();

pedidos.forEach(
pedido=>{

totalVentas +=
pedido.total || 0;

if(
pedido.fecha &&
pedido.fecha.includes(hoy)
){

ventasHoy +=
pedido.total || 0;

}

if(
pedido.cliente &&
pedido.cliente.nombre
){

clientes[
pedido.cliente.nombre
] =

(clientes[
pedido.cliente.nombre
] || 0) + 1;

}

if(
pedido.productos
){

pedido.productos.forEach(
p=>{

productos[
p.nombre
] =

(productos[
p.nombre
] || 0)

+

p.cantidad;

});

}

}
);

document.getElementById(
"totalPedidos"
).innerText =
pedidos.length;

document.getElementById(
"totalVentas"
).innerText =

"$" +

totalVentas.toLocaleString(
"es-CO"
);

document.getElementById(
"ventasHoy"
).innerText =

"$" +

ventasHoy.toLocaleString(
"es-CO"
);

const clientesUnicos =
Object.keys(
clientes
).length;

document.getElementById(
"totalClientes"
).innerText =
clientesUnicos;

const ticketPromedio =

pedidos.length

?

totalVentas /
pedidos.length

:

0;

document.getElementById(
"ticketPromedio"
).innerText =

"$" +

ticketPromedio.toLocaleString(
"es-CO"
);

let productoTop = "-";
let cantidadTop = 0;

for(
const nombre in productos
){

if(
productos[nombre] >
cantidadTop
){

cantidadTop =
productos[nombre];

productoTop =
nombre;

}

}

document.getElementById(
"productoTop"
).innerText =
productoTop;

let clienteTop = "-";
let comprasTop = 0;

for(
const nombre in clientes
){

if(
clientes[nombre] >
comprasTop
){

comprasTop =
clientes[nombre];

clienteTop =
nombre;

}

}

document.getElementById(
"clienteTop"
).innerText =
clienteTop;

const ultimos =

[...pedidos]
.reverse()
.slice(0,10);

ultimos.forEach(
pedido=>{

contenedor.innerHTML += `

<div class="card">

<h3>

${pedido.numero}

</h3>

<p>

👤 ${pedido.cliente.nombre}

</p>

<p>

📅 ${pedido.fecha}

</p>

<p>

💰 $${pedido.total.toLocaleString("es-CO")}

</p>

<p>

Estado:
${pedido.estado}

</p>

</div>

`;

}
);

function exportarCSV(){

let csv =

"Pedido;Fecha;Cliente;Telefono;Total\n";

pedidos.forEach(
p=>{

csv +=

`${p.numero};`

+

`${p.fecha};`

+

`${p.cliente.nombre};`

+

`${p.cliente.telefono};`

+

`${p.total}\n`;

}
);

const blob =
new Blob(
[csv],
{
type:
"text/csv;charset=utf-8;"
}
);

const enlace =
document.createElement(
"a"
);

enlace.href =
URL.createObjectURL(
blob
);

enlace.download =
"pedidos-nextfuxion.csv";

enlace.click();

}
