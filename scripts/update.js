const fs = require("fs");

try {

const html = fs.readFileSync(
"./pagina.html",
"utf8"
);

const productos = [];

const bloques =
html.match(
/<div class="content-item shop-product">[\s\S]*?<\/form>/g
) || [];

bloques.forEach((bloque,index)=>{

let nombre =
`Producto ${index+1}`;

const nombreMatch =
bloque.match(
/<div class="nameProduct">([\s\S]*?)<\/div>/
);

if(nombreMatch){

nombre =
nombreMatch[1]
.replace(/<[^>]+>/g," ")
.replace(/\s+/g," ")
.trim();

}

let precio = "$0";

const precioMatch =
bloque.match(
/<span class="price colorTheme">([\s\S]*?)<\/span>/
);

if(precioMatch){

precio =
precioMatch[1]
.replace(/\s+/g," ")
.trim();

}

/* IMAGEN */

let imagen = "";

const imgMatch =
bloque.match(
/src="([^"]+)"/
);

if(imgMatch){

imagen =
imgMatch[1];

/* convertir imagen local a URL real */

if(
imagen.startsWith(
"./pagina_files/"
)
){

const archivo =
imagen.replace(
"./pagina_files/",
""
);

imagen =
"https://fuxionstorage.blob.core.windows.net/vhdfuxionoffix/newOffix/imageProducts/CO/"
+
archivo;

}

}

/* LINK */

let link =
"https://ifuxion.com/GIOVANNAASTRIDRANGELFARFAN";

const item =
bloque.match(
/itemcode=(\d+)/i
);

if(item){

link =
"https://ifuxion.com/giovannaastridrangelfarfan/enrollment/productsdet?itemcode="
+
item[1];

}

productos.push({

nombre,
precio,
categoria:"FuXion",
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

console.error(error);

process.exit(1);

}
