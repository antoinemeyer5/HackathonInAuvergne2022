
// Auchan url
var url_auchan = "https://www.auchan.fr";

var xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:8000/basket", true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(null);

//add title details du panier
let title_details = document.createElement("h3");
title_details.append("Détails du panier");
document.body.append(title_details);

// get response
var response = xhr.responseText;

xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        // transfrom response to json
        response = JSON.parse(this.responseText);
        // add data in display html
        // get basket
        for (let i = 0; i < response.prices.length; i++) {
            let details = document.createElement("p");
            details.append(response.brands[i] + " : " + response.prices[i]);
            document.body.append(details);
        }
    }
};

//add title quete
let title_quetes = document.createElement("h3");
title_quetes.append("Quêtes du jour");
document.body.append(title_quetes);

//quest
let quest = document.createElement("p");
quest.append("[...]");
document.body.append(quest);

// trait horizontal
document.body.append(document.createElement("hr"));

// add ethic'score
let ethic_score = document.createElement("p");
ethic_score.append("Votre Ethic'score : 0.00€");
document.body.append(ethic_score);





// function to get the url of the current tab
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let url = tabs[0].url;
    // if good url
    if(url.indexOf(url_auchan)==0){
        // send script
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ['filter.js']
        });


        // get basket from localhost:8000/basket

    }
});