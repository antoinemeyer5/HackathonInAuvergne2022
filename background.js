// list of urls
var urls = [
    "https://www.casino.fr/ecommerce/GC-catalog/fr/WE63936/?moderetrait=Z4",
    "http://www.yahoo.com",
    "http://www.bing.com"
];

// dictionary of urls and corresponding div class
var urlDivMap = {
    "https://www.casino.fr/ecommerce/GC-catalog/fr/WE63936/?moderetrait=Z4": "product-item__inner",
    "http://www.yahoo.com": "yahoo",
    "http://www.bing.com": "bing"
};


function getDivClass(url) {
    return console.log(urlDivMap[url]);
}


// function to get the url of the current tab
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let url = tabs[0].url;
    // send script
    chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        function: getDivClass
    });
    if (urls.includes(url)) {
        // change background color to red
        document.body.style.backgroundColor = "red";
        console.log("This is a test");
        console.log("url: " + url);
    }
});