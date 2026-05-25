const fs = require("fs");

try {

const html = fs.readFileSync(
"./pagina.html",
"utf8"
);

const productos = [];

const regexImagen =
/https:\/\/fuxionstorage\.blob\.core\.windows\.net[^"' ]+/g;

const imagenes = [
...html.matchAll(regexImagen)
];

imagenes.forEach((img,index)=>{

const imagen = img[0];

/* bloque cercano a la imagen */

const inicio =
Math.max(
0,
img.index - 5000
);

const fin =
Math.min(
html.length,
img.index + 8000
);

const bloque =
html.substring(
inicio,
fin
);

/* nombre real */

let nombre =
`Producto ${index+1}`;

const nombres = [
...bloque.matchAll(
/FUXION\s+[A-Z0-9\s\-\(\)x\.]{4,150}/gi
)
];

if(
nombres.length>0
){

nombre =
nombres[0][0]
.replace(/\s+/g," ")
.trim();

}

/* precio */

let precio =
"Sin precio";

const precios = [
...bloque.matchAll(
/\$\s*[0-9]+(?:[.,][0-9]+)?/g
)
];

if(
precios.length>0
){

precio =
precios[0][0];

}

/* itemcode */

let link =
"https://ifuxion.com/GIOVANNAASTRIDRANGELFARFAN";

const item =
bloque.match(
/productsdet\?itemcode=\d+/i
);

if(item){

link =
"https://ifuxion.com/" +
item[0];

}

productos.push({

nombre,
precio,
categoria:"FuXion",
imagen,
link

});

});

/* eliminar duplicados */

const unicos =
Array.from(
new Map(
productos.map(
p=>[
p.imagen,
p
]
)
).values()
);

fs.writeFileSync(
"productos.json",
JSON.stringify(
unicos,
null,
2
)
);

console.log(
"Productos:",
unicos.length
);

}
catch(error){

console.error(error);

process.exit(1);

}
