// list of urls
var urls = [
    "https://www.auchan.fr/fruits-legumes/fruits/pommes-poires/pommes/ca-n0301140301#e1b8831b-1b1b-4e1e-8a15-9a713822cf1f_317"
];

// function to get the url of the current tab
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let url = tabs[0].url;
    // if good url
    if (urls.includes(url)) {
        // if click filter
        // send script
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ['filter.js']
        });
        // change background color to red
        // document.body.style.backgroundColor = "red";
    }
});
