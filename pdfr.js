'use strict'

const puppeteer = require('puppeteer');

var browser = false;

var default_parameters = {
    url: "",
    scale: 1,
    printBackground: false,
    landscape: false,
    format: "A4",
    delay: 0
};

/**
 * Read parameters passed in the request and merge them with the default values
 */
function readParameters(req){
    var request_parameters = {};

    var page_formats = ["Letter", "Legal", "Tabloid","Ledger","A0","A1","A2","A3","A4","A5","A6"];

    if (req.query.url && "" != req.query.url) {
        request_parameters.url = req.query.url;
    }

    if (req.query.scale && !isNaN(parseFloat(req.query.scale))) {
        request_parameters.scale = parseFloat(req.query.scale);
    }

    if (req.query.printBackground && 1 === parseInt(req.query.printBackground)) {
         request_parameters.printBackground = true;
    }

    if (req.query.landscape && 1 == parseInt(req.query.landscape)) {
        request_parameters.landscape = true;
    }

    if (req.query.format && page_formats.indexOf(req.query.format) > -1) {
        request_parameters.format = req.query.format;
    }

    if (req.query.delay && parseInt(req.query.delay) > 0) {
        request_parameters.delay = parseInt(req.query.delay);
    }

    return Object.assign({}, default_parameters, request_parameters);
}

async function makePdf( params, page ){
    console.log("Converting " + params.url);
    console.log("Options: ", params);

    await page.goto(params.url);
    if( params.delay > 0 ){
        await page.waitFor(params.delay);
    }

    return page.pdf(params);
}

async function outputPdf(pdf, response){
    response.set('Content-Type', 'application/pdf');
    return response.send(pdf);
}


async function convertToPdf(request, response) {
    var params = readParameters(request);
    var page = await getBrowserPage();
    var pdf = await makePdf(params, page);
    await page.close();

    return outputPdf(pdf, response);
}

/**
 * Get a new page from a singleton browser instance
 */
async function getBrowserPage() {
    if (!browser) {
        browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });
    }

    return browser.newPage();
}


module.exports = convertToPdf;