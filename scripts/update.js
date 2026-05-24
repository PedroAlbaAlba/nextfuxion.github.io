const fs = require("fs");

async function probar(){

try{

const axios = require("axios");

const url =
"https://ifuxion.com/giovannaastridrangelfarfan/enrollment/products?culture=es-CO";

const respuesta =
await axios.get(
url,
{
maxRedirects:0,

validateStatus:
status =>
status >=200 &&
status <400,

headers:{
Cookie:
"FuXionSiteCulture=es-CO",

"Accept-Language":
"es-CO,es;q=0.9",

"User-Agent":
"Mozilla/5.0"
}
}
);

console.log(
"STATUS:",
respuesta.status
);

if(
respuesta.status===301 ||
respuesta.status===302
){

console.log(
"REDIRECT:",
respuesta.headers.location
);

}

if(
respuesta.data
){

fs.writeFileSync(
"pagina.html",
respuesta.data
);

console.log(
"HTML guardado"
);

}

process.exit(0);

}
catch(error){

console.error(
error.message
);

if(
error.response
){

console.log(
"STATUS:",
error.response.status
);

console.log(
"LOCATION:",
error.response.headers.location
);

}

process.exit(1);

}

}

probar();
