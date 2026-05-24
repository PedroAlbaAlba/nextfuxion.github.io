try {

console.log("Inicio");

const axios = require("axios");

console.log("Axios cargado");

process.exit(0);

}
catch(error){

console.error(
"CARGA FALLIDA:"
);

console.error(error);

process.exit(1);

}
