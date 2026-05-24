const fs = require("fs");

async function probar(){

try{

const axios = require("axios");

const respuesta =
await axios.get(
"https://ifuxion.com/giovannaastridrangelfarfan/enrollment/products",
{
maxRedirects: 5,

headers:{
Cookie:
"FuXionSiteCulture=es-CO",

Accept:
"text/html",

"User-Agent":
"Mozilla/5.0"
}
}
);

console.log(
"STATUS:",
respuesta.status
);

console.log(
"URL FINAL:",
respuesta.request.res.responseUrl
);

fs.writeFileSync(
"pagina.html",
respuesta.data
);

console.log(
"HTML GUARDADO"
);

process.exit(0);

}
catch(error){

console.error(
"ERROR:"
);

if(
error.response
){

console.log(
"STATUS",
error.response.status
);

}

console.log(
error.message
);

process.exit(1);

}

}

probar();
