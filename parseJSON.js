// read exemple.json
//

const fs = require('fs');
const path = require('path');


db = {products: []}; 

// read exemple.json
const exemple = require('./exemple.json');

// for each product in exemple.json
exemple.products.forEach((product) => {
    const productInDb = {
        code: product.code,
        countries: "product.countries",
        nutriscore: "product.nutriscore_grade",
        eco_score: "product.ecoscore_grade",
        label: product.labels,
        fairness: true
    }
    db.products.push(productInDb);
});
console.log(JSON.stringify(db));

