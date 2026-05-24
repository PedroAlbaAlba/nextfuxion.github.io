const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

async function actualizar() {

const url =
"https://ifuxion.com/giovannaastridrangelfarfan/enrollment/products";

const respuesta = await axios.get(
url,
{
headers:{
Cookie:
"FuXionSiteCulture=es-CO"
}
}
);

const $ = cheerio.load(
respuesta.data
);

const productos = [];

$("img").each((i,el)=>{

const imagen =
$(el).attr("src");

if(
!imagen ||
!imagen.includes(
"fuxionstorage.blob.core.windows.net"
)
){
return;
}

const parent =
$(el).parent();

const texto =
parent.text()
.replace(/\s+/g," ")
.trim();

const nombre =
texto.match(
/([A-Z0-9\-\+\s]{5,})/
);

const precio =
texto.match(
/\$\s*[0-9.,]+/
);

const link =
parent
.find(
'a[href*="productsdet"]'
)
.attr("href");

productos.push({

nombre:
nombre
? nombre[0].trim()
: "Producto",

precio:
precio
? precio[0]
: "$0 COP",

categoria:
"FuXion",

imagen:
imagen,

link:
link
? (
"https://ifuxion.com"+
link
)
:
"https://ifuxion.com/GIOVANNAASTRIDRANGELFARFAN"

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

actualizar();
