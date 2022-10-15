// Auchan url
var url_auchan = "https://www.auchan.fr";

// function to get the url of the current tab
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let url = tabs[0].url;
    // if good url
    if(url.indexOf(url_auchan)==0){
        // send script
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ['filter.js']
        });
        // change background color to red
        // document.body.style.backgroundColor = "red";
    }
});