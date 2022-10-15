// Auchan url
var url_auchan = "https://www.auchan.fr";

var xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:8000/basket", true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(null);

// get response
xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        document.body.style.backgroundColor = "red";
        // transfrom response to json
        var response = JSON.parse(this.responseText);
        // get basket
        for (let i = 0; i < response.prices.length; i++) {

            let p = document.createElement("p");
            
            p.append("Basket: " + response.brands[i] + " " + response.prices[i]);
            document.body.append(p);
        }
    }
};


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