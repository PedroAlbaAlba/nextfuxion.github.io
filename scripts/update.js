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

/* nombre */

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

/* precio */

let precio =
"$0";

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

/* imagen */

let imagen = "";

const imgMatch =
bloque.match(
/<img[^>]+src="([^"]+)"/
);

if(imgMatch){

imagen = imgMatch[1];

}

/* link */

let link =
"https://ifuxion.com/GIOVANNAASTRIDRANGELFARFAN";

const linkMatch =
bloque.match(
/productsdet\?itemcode=\d+/
);

if(linkMatch){

link =
"https://ifuxion.com/giovannaastridrangelfarfan/enrollment/" +
linkMatch[0];

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
"Productos encontrados:",
productos.length
);

}
catch(error){

console.error(error);

process.exit(1);

}
