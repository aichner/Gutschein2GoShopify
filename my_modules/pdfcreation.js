const PDFDocument = require('pdfkit');
const request = require('request');

async function getCoupon(req, res) {
    let data = req.body.coupons;
    let doc = new PDFDocument();
    let tempCoupons = [];
    for (let i = 0; i < data.length; i++) {
        if (i % 3 == 0 && i != 0) {
            doc.addPage();
            for (let j = 0; j < tempCoupons.length; j++) {
                await drawSingleCouponBack(doc, tempCoupons[j], j);
            }
            doc.addPage();
            tempCoupons = []; // clear array to save new 3 coupons
        }
        drawSingleCouponFront(doc, data[i], i % 3);
        tempCoupons.push(data[i]); // store the 3 coupons for the backside
    }
    if (tempCoupons.length != 0) {
        doc.addPage();
        for (let j = 0; j < tempCoupons.length; j++) {
            await drawSingleCouponBack(doc, tempCoupons[j], j);
        }
    }

    // Setting response to 'attachment' (download).
    // If you use 'inline' here it will automatically open the PDF
    res.setHeader('Content-disposition', 'attachment; filename="gutschein.pdf"');
    res.setHeader('Content-type', 'application/pdf');
    doc.pipe(res);
    doc.end();
};

function drawSingleCouponFront(doc, coupon, position) {
    yOffset = position * doc.page.height / 3;
    doc.rect(0, yOffset + 0, doc.page.width, doc.page.height / 3).fill(coupon.primaryColor);
    doc.fill(coupon.secondaryColor).stroke();
    doc.fontSize(16);
    doc.text(coupon.text, 10, yOffset + 10, { lineBreak: false });
}

async function drawSingleCouponBack(doc, coupon, position) {
    yOffset = position * doc.page.height / 3;
    doc.rect(0, yOffset + 0, doc.page.width, doc.page.height / 3).fill(coupon.primaryColor);
    doc.fill(coupon.secondaryColor).stroke();
    doc.fontSize(20);
    doc.text('This is the backside of the coupon with order date: ' + coupon.orderDate, 10, yOffset + 20, { lineBreak: false });
    await addQrCode(doc, coupon.qrToken, doc.page.width - 150, yOffset + doc.page.height / 3 - 150);
}

async function addQrCode(doc, token, x, y) {
    return new Promise((resolve, reject) => {
        request({ url: 'http://chart.googleapis.com/chart?cht=qr&chs=150x150&choe=UTF-8&chld=L&chl=https://g2g.at/verify?token=' + token, encoding: null }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                var img = new Buffer(body, 'base64');
                doc.image(img, x, y);
                resolve();
            } else {
                console.error(error + '\n status code: ' + response.statusCode);
                reject();
            }
        });
    });
}


module.exports.getCoupon = getCoupon;