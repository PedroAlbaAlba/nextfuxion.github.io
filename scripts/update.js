const fs = require("fs");
const cheerio = require("cheerio");

try {

const html =
fs.readFileSync(
"./pagina.html",
"utf8"
);

const $ =
cheerio.load(html);

const productos = [];

$(".content-item.shop-product").each((i,el)=>{

const nombre =
$(el)
.find(".nameProduct")
.text()
.replace(/\s+/g," ")
.trim();

const precio =
$(el)
.find(".price.colorTheme")
.first()
.text()
.replace(/\s+/g," ")
.trim();

let imagen =
$(el)
.find("img.product-image")
.attr("src");

const link =
$(el)
.find(
'a[href*="productsdet"]'
)
.first()
.attr("href");

/* corregir imagen local */

if(
imagen &&
imagen.startsWith("./pagina_files/")
){

imagen =
imagen.replace(
"./pagina_files/",
"https://fuxionstorage.blob.core.windows.net/vhdfuxionoffix/newOffix/imageProducts/CO/"
);

}

productos.push({

nombre:
nombre ||
`Producto ${i+1}`,

precio:
precio ||
"$0",

categoria:
"FuXion",

imagen:
imagen || "",

link:
link ||
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
catch(error){

console.error(error);

process.exit(1);

}
