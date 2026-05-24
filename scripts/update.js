const axios = require("axios");
const fs = require("fs");

async function revisar(){

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

fs.writeFileSync(
"pagina.html",
respuesta.data
);

console.log(
"HTML guardado"
);

}

revisar();
