const fs = require("fs");

const productos = [
{
nombre:"TEST FUXION",
precio:"$100 COP",
categoria:"PRUEBA",
imagen:"",
link:"https://ifuxion.com/GIOVANNAASTRIDRANGELFARFAN"
}
];

fs.writeFileSync(
"productos.json",
JSON.stringify(
productos,
null,
2
)
);

console.log(
"archivo generado"
);
