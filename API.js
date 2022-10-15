const { json } = require('express');
const express = require('express');

const getBarcode = require('./getBarcode');

const app = express();

app.use(express.json());

app.listen(8000, () => {
    console.log('Listening on port 8000');
}
);

app.get('/', (req, res) => {
    res.send('Hello World');
}
);


// read the file
const fs = require('fs');
const file = fs.readFileSync('db.json', 'utf8');

const quests = fs.readFileSync('questsData.json', 'utf8');

// read db
const db = JSON.parse(file);
const questsData = JSON.parse(quests);


app.get('/products/:id', (req, res) => {
    // get id
    const id = req.params.id;
    console.log("Requesting product", id);
    console.log(req.query);
    // send product with code id
    const product = db.products.find(product => product.code == id);
    res.send(product);
}
);

app.get('/quests/:id', (req, res) => {
    // get id
    const id = req.params.id;
    console.log("Requesting quest", id);
    console.log(req.query);
    // send product with code id
    const quest = questsData.quests.find(quest => quest.id == id);
    res.send(quest);
}
);

app.post('/products', (req, res) => {
    // get request body
    console.log("Resquesting all products");
    const body = req.body;
    // get all urls from body
    const barcodes = []; 
    body.urls.forEach(url => {
        barcodes.push(getBarcode(url));
    });

    console.log(barcodes)
    
    res.json({barcodes: barcodes});
});