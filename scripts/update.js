const fs = require("fs");

try {

const html = fs.readFileSync(
"pagina.html",
"utf8"
);

const imagenes = [
...html.matchAll(
/https:\/\/fuxionstorage\.blob\.core\.windows\.net[^"' ]+/g
)
].map(x=>x[0]);

const nombres = [
...html.matchAll(
/FUXION[^<\n]{3,150}/g
)
].map(x=>x[0].trim());

const precios = [
...html.matchAll(
/\$\s*[0-9.,]+/g
)
].map(x=>x[0]);

const productos = [];

const total =
Math.max(
imagenes.length,
nombres.length
);

for(let i=0;i<total;i++){

productos.push({

nombre:
nombres[i] ||
`Producto ${i+1}`,

precio:
precios[i] ||
"$0 COP",

categoria:
"FuXion",

imagen:
imagenes[i] ||
"",

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
"Productos:",
productos.length
);

process.exit(0);

}
catch(error){

console.error(error);

process.exit(1);

}
