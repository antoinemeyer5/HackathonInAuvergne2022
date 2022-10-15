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


function getOriginScore(country){
    let score = 0;
    switch (country) {
        case "France":
            score = 10;
            break;
        case "Europe":
            score = 7;
            break;
        case "Afrique":
            score = 5;
            break;
        case "Asie":
            score = 3;
            break;
        case "Amerique":
            score = 1;
            break;
        default:
            score = 0;
            break;
    }
    return score;
}


function getNutriscoreScore(nutriscore){
    let score = 0;
    switch (nutriscore) {
        case "a":
            score = 10;
            break;
        case "b":
            score = 7;
            break;
        case "c":
            score = 5;
            break;
        case "d":
            score = 3;
            break;
        case "e":
            score = 1;
            break;
        default:
            score = 0;
            break;
    }
    return score;
}


function getScores(barcodes){
    let scores = [];
    for (let i = 0; i < barcodes.length; i++){
        const product = db.products.find(product => product.code == barcodes[i]);
        let score = 0;

        // fill product information
        let fairness = (product.fairness == "true") ? 10 : 0;
        let origin = getOriginScore(product.country);
        let nutriscore = getNutriscoreScore(product.nutriscore_grade);

        // EE stands for "Ethique Environnementale"
        let coeff_EE = 0.4;
        let EE = (origin + product.recyclability + product.bio)/3;

        // EC stands for "Ethique Corps"
        let coeff_EC = 0.2;
        let EC = nutriscore;

        // EP stands for "Ethique Production"
        let coeff_EP = 0.4;
        let EP = fairness;

        score = coeff_EE*EE + coeff_EC*EC + coeff_EP*EP;

        scores.push(score);
    }
    return scores;
}


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