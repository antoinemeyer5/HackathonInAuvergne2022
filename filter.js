async function getScores(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8000/scores", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(null);

    let scores = [5,3,4,9,5,6,6,4,5,4,8,5,6,2,5,7,6,5,4,7,6,5,4,8,5,4,6,4,7,8];
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            console.log(response);
        }
    }
    return scores;
};

let scoresList = [];
(async() => {
    console.log("before start");

    scoresList = await getScores();

    // console.log(scoresList.item(0));

    var list_products = document.getElementsByClassName('product-thumbnail__details-wrapper');
    // result
    var url_products = [];
    
    for (let i = 0; i < list_products.length; i++) {
        //console.log(list_products.item(i).href);
        url_products.push(list_products.item(i).href);
    }
    
    // call Taha's API
    
    // recup response : 88 / 100
    var score = 54;
    
    // modify dom page for display our score
    let list_product_to_modify = document.getElementsByClassName("product-thumbnail__header");
    
    for (let i = 0; i < list_product_to_modify.length; i++) {
        // new element
        let p = document.createElement("p");
        let this_score = scoresList[i];
        p.append("Ethic'score :  " + this_score + "/10");
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
        list_product_to_modify.item(i).append(p);
    
        // adding padding 
        list_product_to_modify.item(i).style.padding = "10%";
        list_product_to_modify.item(i).style.textAlign = "center";
        // width
        list_product_to_modify.item(i).style.width = "50%";
        list_product_to_modify.item(i).style.margin = "auto";

    }
    
    //
    const elems = document.querySelectorAll('.product-thumbnail__header');
    elems.forEach(elem => {
        elem.classList.remove('product-thumbnail__header');
    })
    console.log("after start");
})();
