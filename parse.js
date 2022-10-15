const csv = require('csv-parser');
const fs = require('fs');


let databaseJSON = { products: [] };

// import csv file
// parse csv file
// csv tab instead of commas
fs.createReadStream('exemple.csv')
    .pipe(csv({ separator: '\t' }))
    .on('data', (row) => {
        // create a product object
        const product = {
            code: row.code,
            label: row.label,
            countries: row.countries,
        };
        // add product to databaseJSON
        databaseJSON.products.push(product);
        console.log(databaseJSON);
    })
    .on('end', () => {
        fs.writeFileSync('db.json', JSON.stringify(databaseJSON));
        // write to json file
        console.log('CSV file successfully processed');
    }
);

