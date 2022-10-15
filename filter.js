
// Auchan
var list_products = document.getElementsByClassName('product-thumbnail__details-wrapper');
var url_products = [];

for (let i = 0; i < list_products.length; i++) {
    //console.log(list_products.item(i).href);
    url_products.push(list_products.item(i).href);
}

console.log(url_products);
