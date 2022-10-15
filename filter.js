// Auchan
var list_products = document.getElementsByClassName('product-thumbnail__details-wrapper');
// result
var url_products = [];

for (let i = 0; i < list_products.length; i++) {
    //console.log(list_products.item(i).href);
    url_products.push(list_products.item(i).href);
}

console.log(url_products);

// send url_products to localhost:8000/products
var xhr = new XMLHttpRequest();
xhr.open("POST", "http://localhost:8000/products", true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({ urls: url_products }));


// call Taha's API

// recup response : 88 / 100
var list_res = [18, 88, 100, 50, 37];