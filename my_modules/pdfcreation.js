const PDFDocument = require('pdfkit');
const shopify = require('./shopify');

function getCoupon(req, res) {
    let data = req.body.coupons;
    let doc = new PDFDocument();
    data.forEach((coupon) => {
        drawSingleCoupon(doc, coupon);
    });


    // Setting response to 'attachment' (download).
    // If you use 'inline' here it will automatically open the PDF
    res.setHeader('Content-disposition', 'attachment; filename="gutschein.pdf"');
    res.setHeader('Content-type', 'application/pdf');

    doc.pipe(res);
    doc.end();
};

function drawSingleCoupon(doc, coupon, position) {
    yOffset = position * doc.page.height / 3;

    doc.rect(0, 0, doc.page.width, yOffset + doc.page.height / 3).fill(coupon.primaryColor);
    doc.fill(coupon.secondaryColor).stroke();
    doc.fontSize(16);
    doc.text(coupon.text, 10, yOffset + 10, { lineBreak: false });
    
}


module.exports.getCoupon = getCoupon;