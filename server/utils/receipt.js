const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generateReceipt({ name, email, amount, type, date, tier, txnId }) {
  const doc = new PDFDocument();
  const filename = `receipt_${txnId || Date.now()}.pdf`;
  const outPath = path.join(__dirname, '..', '..', 'legal', 'receipts', filename);

  doc.fontSize(18).text('NuVizion Tax Receipt', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Name: ${name}`);
  doc.text(`Email: ${email}`);
  doc.text(`Date: ${date}`);
  doc.text(`Amount: $${amount}`);
  doc.text(`Purpose: ${type} (${tier})`);
  doc.text(`Transaction ID: ${txnId}`);
  doc.moveDown();
  doc.text('NuVision 508(c)(1)(a) Private Membership Association');
  doc.text('This donation supports spiritual, educational, and artistic missions.');
  doc.end();

  doc.pipe(fs.createWriteStream(outPath));
  return new Promise((resolve, reject) => {
    doc.on('finish', () => resolve(outPath));
    doc.on('error', reject);
  });
}

module.exports = generateReceipt;
