const pedidos =

JSON.parse(
localStorage.getItem(
"pedidos"
)
) || [];

document.getElementById(
"totalPedidos"
).innerText =
pedidos.length;

const clientesUnicos =
new Set();

let totalVentas = 0;

pedidos.forEach(
pedido=>{

clientesUnicos.add(
pedido.cliente.telefono
);

totalVentas +=
pedido.total || 0;

}
);

document.getElementById(
"totalClientes"
).innerText =
clientesUnicos.size;

document.getElementById(
"totalVentas"
).innerText =

"$" +

totalVentas.toLocaleString(
"es-CO"
);

const contenedor =
document.getElementById(
"ultimosPedidos"
);

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
