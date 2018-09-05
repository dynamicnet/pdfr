#!/usr/bin/env node

const express = require("express");
const app = express();

const pdfr = require("./pdfr");

/**
 * HTTP Parameters :
 * url:  url of the page to convert in PDF
 * scale: 1
 * printBackground: false
 * landscape: false
 * format: "A4"
 * delay: PDF conversion append just after the onload envent, if you need more time to setup your page, use this parameter default to 0 (in millisecond)
 */
app.get("/pdf", pdfr);

app.listen(3000);
console.log("Running...");
