const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

async function actualizar() {

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

const $ =
cheerio.load(
respuesta.data
);

const productos = [];

/* buscar tarjetas comunes */

$("img").each((i,el)=>{

const imagen =
$(el).attr("src");

const texto =
$(el)
.parent()
.text()
.trim();

if(
imagen &&
texto.length > 3
){

productos.push({

nombre:
texto
.substring(
0,
80
),

precio:
"$0 COP",

categoria:
"FuXion",

imagen:
imagen.startsWith("http")
? imagen
: "https://ifuxion.com" +
imagen,

link:
"https://ifuxion.com/GIOVANNAASTRIDRANGELFARFAN"

});

}

});

/* evitar vacío */

if(
productos.length===0
){

productos.push({

nombre:
"Sin productos detectados",

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
"Productos:",
productos.length
);

}

actualizar();
