const fs = require("fs");

try {

const html =
fs.readFileSync(
"./pagina.html",
"utf8"
);

const productos = [];

/* buscar cada imagen de producto */

const regexImagen =
/https:\/\/fuxionstorage\.blob\.core\.windows\.net[^"' ]+/g;

const imagenes =
[
...html.matchAll(
regexImagen
)
];

imagenes.forEach((img,index)=>{

const imagen =
img[0];

const inicio =
Math.max(
0,
img.index-2000
);

const fin =
Math.min(
html.length,
img.index+4000
);

const bloque =
html.substring(
inicio,
fin
);

/* nombre */

let nombre =
"Producto "+(index+1);

const nombreMatch =
bloque.match(
/FUXION[\sA-Z0-9\-\(\)x\.]{3,150}/i
);

if(
nombreMatch
){

nombre =
nombreMatch[0]
.replace(/\s+/g," ")
.trim();

}

/* precio */

let precio =
"$0";

const precioMatch =
bloque.match(
/\$\s*[0-9.,]+/
);

if(
precioMatch
){

precio =
precioMatch[0];

}

/* link detalle */

let link =
"https://ifuxion.com/GIOVANNAASTRIDRANGELFARFAN";

const linkMatch =
bloque.match(
/productsdet\?itemcode=[0-9]+/
);

if(
linkMatch
){

link =
"https://ifuxion.com/"
+
linkMatch[0];

}

productos.push({

nombre,
precio,
categoria:
"FuXion",
imagen,
link

});

});

fs.writeFileSync(
"productos.json",
JSON.stringify(
productos,
null,
2
)
);

console.log(
"Productos:",
productos.length
);

}
catch(error){

console.error(
error
);

process.exit(1);

}
