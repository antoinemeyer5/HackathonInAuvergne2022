function getSourceAsDOM(url) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    return xmlhttp.responseText;
};

async function getBasket(url){
    const dom = getSourceAsDOM(url);
    const items_prices = document.getElementsByClassName("cart-item__price");
    const items_brand = document.getElementsByClassName("cart-item__brand");


    // get prices
    const prices = [];
    for (let i = 0; i < items_prices.length; i++) {
        prices.push(items_prices.item(i).textContent);
    }

    console.log(prices);

    // get brands
    const brands = [];
    for (let i = 0; i < items_brand.length; i++) {
        brands.push(items_brand.item(i).textContent);
    }

    for (let i = 0; i < items_prices.length; i++) {
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
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };

    return this.responseText;
}


(async() => {
    await getBasket("https://www.auchan.fr/checkout/cart/");
})();
