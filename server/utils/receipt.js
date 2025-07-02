const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

async function generateReceipt({ name, email, amount, txnId }) {
  const doc = new PDFDocument();
  const filename = `receipt_${txnId || Date.now()}.pdf`;
  const outPath = path.join(__dirname, '..', '..', 'legal', 'receipts', filename);

  doc.fontSize(18).text('NuVizion Official Receipt', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Name: ${name}`);
  doc.text(`Email: ${email}`);
  doc.text(`Amount: $${amount}`);
  doc.text(`Transaction ID: ${txnId}`);
  doc.moveDown();
  doc.text('This is your official digital receipt from NuVizion.');
  doc.end();

  await new Promise((resolve, reject) => {
    doc.pipe(fs.createWriteStream(outPath));
    doc.on('finish', resolve);
    doc.on('error', reject);
  });
  return outPath;
}

module.exports = generateReceipt;
 