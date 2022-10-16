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

function getBioScore(label){
    if (label)
        return 10;
    return 0;
}


function getScores(barcodes){
    let scores = [];
    for (let i = 0; i < barcodes.length; i++){
        const product = db.products.find(product => product.code == barcodes[i]);

        if (product){

            let score = 0;

            console.log(product);

            // fill product information
            let fairness = 10; //(product.fairness == "true") ? 10 : 0;
            let origin = getOriginScore(product.coutries);
            let nutriscore = getNutriscoreScore(product.nutriscore);
            let recyclability = getNutriscoreScore(product.eco_score);
            let bio = getBioScore(product.fairness);


            // EE stands for "Ethique Environnementale"
            let coeff_EE = 0.4;
            let EE = (origin + recyclability + bio)/3;

            // EC stands for "Ethique Corps"
            let coeff_EC = 0.3;
            let EC = nutriscore;

            // EP stands for "Ethique Production"
            let coeff_EP = 0.3;
            let EP = fairness;

            score = coeff_EE*EE + coeff_EC*EC + coeff_EP*EP;

            console.log(coeff_EE * EE);
            console.log(coeff_EC * EC);
            console.log(coeff_EP * EP);

            scores.push(parseInt(score));
        }
        else {
            scores.push(0);
        }

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

    // get scores
    const scores = getScores(barcodes);
    console.log(scores);
    
    // write scores to scores.json
    fs.writeFileSync('scores.json', JSON.stringify(scores));
    console.log(scores);
    res.json("scores saved successfully");
});

app.post('/basket', (req, res) => {
    // get request body
    console.log("Resquesting basket");
    const body = req.body;
    console.log(body);
    // write to basket.json
    fs.writeFileSync('basket.json', JSON.stringify(body));
    console.log(body);
    res.send("basket saved successfully");
}
);

app.get('/basket', (req, res) => {
    // get basket
    const basket = fs.readFileSync('basket.json', 'utf8');
    console.log(basket);
    res.send(basket);
}
);

app.get('/scores', (req, res) => {
    // get scores
    const scores = fs.readFileSync('scores.json', 'utf8');
    console.log(scores);
    res.send(scores);
}
);