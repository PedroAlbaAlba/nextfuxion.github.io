const fs = require("fs");

async function probar(){

try{

const axios =
require("axios");

console.log(
"Iniciando descarga"
);

const respuesta =
await axios.get(
"https://ifuxion.com/giovannaastridrangelfarfan/enrollment/products",
{
headers:{
Cookie:
"FuXionSiteCulture=es-CO",
"User-Agent":
"Mozilla/5.0"
},
timeout:30000
}
);

console.log(
"Descarga OK"
);

console.log(
"Tamaño HTML:",
respuesta.data.length
);

fs.writeFileSync(
"pagina.html",
respuesta.data
);

console.log(
"HTML guardado"
);

process.exit(0);

}
catch(error){

console.error(
"ERROR REAL:"
);

console.error(
error.message
);

process.exit(1);

}

}

probar();
