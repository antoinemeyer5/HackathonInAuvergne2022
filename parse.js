const csv = require('csv-parser');
const fs = require('fs');


// import csv file
// parse csv file
// csv tab instead of commas
fs.createReadStream('database/en.openfoodfacts.org.products.csv')
    .pipe(csv({ separator: '\t' }))
    .on('data', (row) => {
        // get label, coutries, postal
        console.log(row.countries);
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });
