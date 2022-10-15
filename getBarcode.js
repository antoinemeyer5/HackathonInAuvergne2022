// import XLMHttpRequest
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// include DOMParser
const { DOMParser } = require('xmldom');

function getSourceAsDOM(url)
{
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET",url,false);
    xmlhttp.send();
    parser=new DOMParser();
    return parser.parseFromString(xmlhttp.responseText,"text/html");     
}

function getBarcode(url) {
    const dom = getSourceAsDOM(url);
    const barcodes = dom.getElementsByClassName("product-description__feature-wrapper");
    const barcode = barcodes[barcodes.length - 1].textContent.split("/");
    console.log(parseInt(barcode[2]));
}

module.exports = getBarcode;
