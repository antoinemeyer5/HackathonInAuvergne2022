const urlMap = {
    "https://www.auchan" : "product-thumbnail__header",
    "https://www.casino.fr" : "product-item__top",
    "https://www.carrefour.fr" : "main-vertical--top"
}

let className = "";
// if url is in urlMap, contains one of the keys in urlMap
if (Object.keys(urlMap).some(url => window.location.href.includes(url))) {
    // get the value of the key that matches the url
    className = urlMap[Object.keys(urlMap).find(url => window.location.href.includes(url))];
}

console.log(className);


async function getScores(){
    // create a promise
    return new Promise((resolve, reject) => {
        // var xhr
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8000/scores", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(null);

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // resolve the promise with the response
                resolve(JSON.parse(xhr.responseText));
            }
        }
    });
}

(async() => {
    console.log("before start");

    const scoresList = await getScores();

    console.log("this is the scores list", scoresList);

    var list_products = document.getElementsByClassName('product-thumbnail__details-wrapper');
    // result
    var url_products = [];
    
    for (let i = 0; i < list_products.length; i++) {
        //console.log(list_products.item(i).href);
        url_products.push(list_products.item(i).href);
    }

    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", "http://localhost:8000/products", true);
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.send(JSON.stringify({ urls: url_products }));

    // // get response
    // xhr.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log(this.responseText);
    //     }
    // }
    
    
    // modify dom page to display our score
    let list_product_to_modify = document.getElementsByClassName(className);
    console.log(list_product_to_modify);
    
    for (let i = 0; i < list_product_to_modify.length; i++) {
        // new element
        let p = document.createElement("p");
        let this_score = scoresList[i];
        p.append("Ethic'score :" + this_score);
        switch (parseInt(this_score)) {
            case 10:
            case 9:
            case 8:
                p.style.backgroundColor = "green";
                break;
            case 7:
            case 6:
            case 5:
                p.style.backgroundColor = "orange";
                break;
            default:
                p.style.backgroundColor = "red";
                break;
        }
        p.style.color = "white";
        list_product_to_modify.item(i).append(p);
    
        // adding padding 
        list_product_to_modify.item(i).style.padding = "10%";
        list_product_to_modify.item(i).style.textAlign = "center";
        // width
        list_product_to_modify.item(i).style.width = "80%";
        list_product_to_modify.item(i).style.margin = "auto";

    }
    
    //
    const elems = document.querySelectorAll('.product-thumbnail__header');
    elems.forEach(elem => {
        elem.classList.remove('product-thumbnail__header');
    })
    console.log("after start");
})();
