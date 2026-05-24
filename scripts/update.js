const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

async function actualizar(){

const url =
"https://ifuxion.com/giovannaastridrangelfarfan/enrollment/products";

const html =
await axios.get(
url,
{
headers:{
Cookie:
"FuXionSiteCulture=es-CO"
}
}
);

const $ =
cheerio.load(
html.data
);

console.log(
"Titulo:",
$("title").text()
);

const productos = [];

productos.push({
nombre:
"Lectura iniciada",
precio:
"$0 COP",
categoria:
"Prueba",
imagen:"",
link:
"https://ifuxion.com/GIOVANNAASTRIDRANGELFARFAN"
});

fs.writeFileSync(
"productos.json",
JSON.stringify(
productos,
null,
2
)
);

}

actualizar();
