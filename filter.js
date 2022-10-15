// Auchan
var list_products = document.getElementsByClassName('product-thumbnail__details-wrapper');
// result
var url_products = [];

for (let i = 0; i < list_products.length; i++) {
    //console.log(list_products.item(i).href);
    url_products.push(list_products.item(i).href);
}

// call Taha's API
console.log(url_products);

// scrap data from https://www.auchan.fr/checkout/cart/

function getSourceAsDOM(url)
{
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET",url,false);
    xmlhttp.send();
    return xmlhttp.responseText;     
}

function getBasket(url) {
    const dom = getSourceAsDOM(url);
    const items_prices = document.getElementsByClassName("cart-item__price");
    const items_brand = document.getElementsByClassName("cart-item__brand");

    // get prices
    const prices = [];
    for (let i = 0; i < items_prices.length; i++) {
        prices.push(items_prices.item(i).textContent);
    }

    // get brands
    const brands = [];
    for (let i = 0; i < items_brand.length; i++) {
        brands.push(items_brand.item(i).textContent);
    }

    for(let i = 0; i < items_prices.length; i++){
        console.log(prices[i], brands[i]);
    }

    // send basket data to localhost:8000/products
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8000/basket", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        prices: prices,
        brands: brands
    }));

    // get response
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }

}

getBasket("https://www.auchan.fr/checkout/cart/");


// send url_products to localhost:8000/products
var xhr = new XMLHttpRequest();
xhr.open("POST", "http://localhost:8000/products", true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({ urls: url_products }));

// get response
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
    }
}

// recup response : 88 / 100
// var list_res = [18, 88, 100, 50, 37];
// var score = 54;

function entierAleatoire(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// modify dom page for display our score
let list_product_to_modify = document.getElementsByClassName("product-thumbnail__header");

// 
for (let i = 0; i < list_product_to_modify.length; i++) {
    // new element
    let p = document.createElement("p");
    p.append("Ethic'score : " + entierAleatoire(0, 10) + "/10");
    p.style.backgroundColor = "red";
    list_product_to_modify.item(i).append(p);
    
    // adding padding 
    list_product_to_modify.item(i).style.padding = "10px 10px 10px 10px";
}

//
const elems = document.querySelectorAll('.product-thumbnail__header');
elems.forEach(elem => {
    elem.classList.remove('product-thumbnail__header');
})





// debug
// console.log(url_products);