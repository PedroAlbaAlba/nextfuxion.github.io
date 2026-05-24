const fs = require("fs");

async function actualizar(){

try{

const axios = require("axios");

const url =
"https://ifuxion.com/giovannaastridrangelfarfan/enrollment/products";

console.log(
"Iniciando descarga..."
);

const respuesta =
await axios.get(
url,
{
headers:{
Cookie:
"FuXionSiteCulture=es-CO",
"User-Agent":
"Mozilla/5.0"
},
timeout:30000
}
);

console.log(
"HTML recibido"
);

const html =
respuesta.data;

const imagenes =
[
...html.matchAll(
/https:\/\/fuxionstorage\.blob\.core\.windows\.net[^"' ]+/g
)
].map(x=>x[0]);

console.log(
"Imagenes:",
imagenes.length
);

const productos = [];

for(
let i=0;
i<
Math.min(
imagenes.length,
20
);
i++
){

productos.push({

nombre:
"Producto "+(i+1),

precio:
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
"Guardado:",
productos.length
);

process.exit(0);

}
catch(error){

console.error(
"ERROR:"
);

console.error(
error
);

process.exit(1);

}

}

actualizar();
