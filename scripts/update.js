const fs = require("fs");

const productos = [];

for(let i=1;i<=10;i++){

productos.push({

nombre:
"Prueba "+i,

precio:
"$100 COP",

categoria:
"TEST",

imagen:
"https://via.placeholder.com/300",

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
"10 productos creados"
);
