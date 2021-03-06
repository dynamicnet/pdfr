# PDFr

Dockerized node webservice that convert web page into PDF

## Build the Docker image
```console
git clone https://github.com/dynamicnet/pdfr.git
cd pdfr
docker build --tag=pdfr .
```

## Run the container
```console
docker run -d \
  -p 3000:3000 \
  --name PDFr \
  pdfr
```

## Parameters
Name | Type | Description
---- | ---- | -----------
url | required string | url of the page to screenshot
scale | optional float (default: 1) | Scale of the webpage rendering
printBackground | opt. int (0\|1) (default: 0) | Print background graphics.
landscape | opt. int (0\|1) (default: 0) | Paper orientation.
format | opt. string (default: A4) | Paper format.
delay | opt. int (default: 0) | PDF conversion append just after the onload envent, if you need more time to setup your page, use this parameter in millisecond
