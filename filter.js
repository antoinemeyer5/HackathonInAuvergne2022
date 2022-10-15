
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
// var list_res = [18, 88, 100, 50, 37];

// modify dom page for display our score
let list_product_to_modify = document.getElementsByClassName("product-thumbnail__header");

//let para = document.createElement("p");
//let textnode = document.createTextNode("Water");
//para.appendChild(textnode);
for (let i = 0; i < list_product_to_modify.length; i++) {
    console.log(list_product_to_modify.item(i));
    list_product_to_modify.item(i).style.backgroundColor = "red";
    // list_product_to_modify.item(i).backgroundColor = "red";

}


/*for (let i = 0; i < list_products.length; i++) {
    //list_products.appendChild(para);
}*/





// debug
// console.log(url_products);
