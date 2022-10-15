
// Auchan
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

// 
for (let i = 0; i < list_product_to_modify.length; i++) {
    // new element
    let p = document.createElement("p");
    p.append("Ethic'score : 4/10");
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
