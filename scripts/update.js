const fs = require("fs");
const axios = require("axios");

async function actualizar(){

const url =
"https://ifuxion.com/giovannaastridrangelfarfan/enrollment/products";

const respuesta =
await axios.get(
url,
{
headers:{
Cookie:
"FuXionSiteCulture=es-CO"
}
}
);

const html =
respuesta.data;

const productos = [];

/* imágenes */

const imagenes =
[
...html.matchAll(
/https:\/\/fuxionstorage\.blob\.core\.windows\.net[^"']+/g
)
].map(x=>x[0]);

/* nombres */

const nombres =
[
...html.matchAll(
/FUXION[^<\\n]{3,120}/g
)
].map(x=>x[0].trim());

/* precios */

const precios =
[
...html.matchAll(
/\$\s*[0-9.,]+/g
)
].map(x=>x[0]);

const total =
Math.min(
imagenes.length,
nombres.length
);

for(
let i=0;
i<total;
i++
){

productos.push({

nombre:
nombres[i] ||
"Producto",

precio:
precios[i] ||
"$0 COP",

categoria:
"FuXion",

imagen:
imagenes[i],

link:
"https://ifuxion.com/GIOVANNAASTRIDRANGELFARFAN"

});

}

if(
productos.length===0
){

productos.push({

nombre:
"No detectado",

precio:
"$0 COP",

categoria:
"Prueba",

imagen:"",
link:
"https://ifuxion.com/GIOVANNAASTRIDRANGELFARFAN"

});

}

fs.writeFileSync(
"productos.json",
JSON.stringify(
productos,
null,
2
)
);

console.log(
"Productos encontrados:",
productos.length
);

}

actualizar();
