const fs = require("fs");

const productos = [
{
nombre:"Café Fit",
precio:"$0 COP",
categoria:"Control de peso",
imagen:"",
link:
"https://ifuxion.com/GIOVANNAASTRIDRANGELFARFAN"
},
{
nombre:"Nutraday",
precio:"$0 COP",
categoria:"Nutrición",
imagen:"",
link:
"https://ifuxion.com/GIOVANNAASTRIDRANGELFARFAN"
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
"productos actualizados"
);
