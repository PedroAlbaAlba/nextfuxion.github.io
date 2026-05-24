const fs = require("fs");

async function actualizar(){

try{

const axios = require("axios");

const url =
"https://ifuxion.com/giovannaastridrangelfarfan/enrollment/products/390";

const respuesta =
await axios.get(
url,
{
headers:{
Cookie:
"FuXionSiteCulture=es-CO",

"User-Agent":
"Mozilla/5.0"
}
}
);

const html =
respuesta.data;

/* imágenes */

const imagenes =
[
...html.matchAll(
/https:\/\/fuxionstorage\.blob\.core\.windows\.net[^"' ]+/g
)
].map(
x=>x[0]
);

/* nombres */

const nombres =
[
...html.matchAll(
/FUXION[^<\n]{3,150}/g
)
].map(
x=>x[0].trim()
);

/* precios */

const precios =
[
...html.matchAll(
/\$\s*[0-9.,]+/g
)
].map(
x=>x[0]
);

const productos = [];

const total =
Math.min(
imagenes.length,
Math.max(
nombres.length,
1
)
);

for(
let i=0;
i<total;
i++
){

productos.push({

nombre:
nombres[i] ||
("Producto "+(i+1)),

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

fs.writeFileSync(
"productos.json",
JSON.stringify(
productos,
null,
2
)
);

console.log(
"PRODUCTOS:",
productos.length
);

process.exit(0);

}
catch(error){

console.error(
error.message
);

process.exit(1);

}

}

actualizar();
