const PDFDocument = require('pdfkit');
const shopify = require('./shopify');

function getCoupon (req, res) {
    let doc = new PDFDocument()
    let name = req.body.name;
    let anschrift = req.body.anschrift;
    let ausstelldatum = req.body.ausstelldatum;

    // Setting response to 'attachment' (download).
    // If you use 'inline' here it will automatically open the PDF
    res.setHeader('Content-disposition', 'attachment; filename="gutschein.pdf"');
    res.setHeader('Content-type', 'application/pdf');

    doc.y = 300;
    doc.text(name, 50, 50);
    doc.text(anschrift, 50, 150);
    doc.text(ausstelldatum, 50, 250);
    doc.pipe(res);
    doc.end();
};


module.exports.getCoupon = getCoupon;