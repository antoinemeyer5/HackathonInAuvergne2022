const { json } = require('express');
const express = require('express');

const app = express();

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

// read db
const db = JSON.parse(file);


app.get('/products', (req, res) => {
    console.log(req.query);
    res.send(db);
}
);