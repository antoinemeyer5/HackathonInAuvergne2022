
// Auchan url
var url_auchan = "https://www.auchan.fr";
var url_casinodrive = "https://www.casino.fr/ecommerce/";
var url_carrefour = "https://www.carrefour.fr"

console.log("before start");

var xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:8000/basket", true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(null);
// document.body.style.backgroundColor = "red";

//quest
let quest = document.createElement("p");
quest.append("Acheter 3 produits ayant une note supérieure à 8");
document.getElementsByClassName("conteneur_quetes")[0].append(quest);

//
quest = document.createElement("p");
quest.append("Acheter 10 produits provenant de France");
document.getElementsByClassName("conteneur_quetes")[0].append(quest);

// trait horizontal
document.body.append(document.createElement("hr"));

// get response
var response = xhr.responseText;
let somme_panier;

xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        // transfrom response to json
        response = JSON.parse(this.responseText);

        // somme du panier
        somme_panier = 0;
        
        // add data in display html
        // get basket
        for (let i = 0; i < response.prices.length; i++) {
            let details = document.createElement("p");
            details.append(response.brands[i] + " : " + response.prices[i]);
            // total panier
            somme_panier = somme_panier + parseInt(response.prices[i].slice(0, response.prices[i].length-1));
            // add in div with conteneur_details class
            document.getElementsByClassName("conteneur_details")[0].append(details);
        }

        // coef
        somme_panier = somme_panier * 0.06;

        // add ethic'score
        let ethic_score = document.createElement("p");
        ethic_score.append("Votre Ethic'cagnotte : " + somme_panier + " €");
        document.getElementsByClassName("conteneur_ecoscore")[0].append(ethic_score);

    }
};


// function to get the url of the current tab
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let url = tabs[0].url;
    // if good url
    // if url is https://www.auchan.fr/checkout/cart/
    if(url.indexOf(url_auchan+"/checkout/cart/") == 0){
        // send script
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ['updateBasket.js']
        });
    }

    if(url.indexOf(url_auchan)==0 || url.indexOf(url_casinodrive)==0 || url.indexOf(url_carrefour)){
        // send script
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ['filter.js']
        });
    }

});