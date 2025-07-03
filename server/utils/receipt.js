const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

/**
 * Generate a PDF receipt and return the file path.
 * @param {Object} options
 * @param {string} options.name
 * @param {string} options.email
 * @param {number} options.amount
 * @param {string} options.txnId
 * @returns {Promise<string>} The path to the PDF file
 */
module.exports = function generateReceipt({ name, email, amount, txnId }) {
  return new Promise((resolve, reject) => {
    // Ensure the receipts directory exists
    const receiptsDir = path.join(__dirname, '../legal/receipts');
    if (!fs.existsSync(receiptsDir)) {
      fs.mkdirSync(receiptsDir, { recursive: true });
    }

    // Generate filename
    const filename = `receipt_${txnId}.pdf`;
    const filePath = path.join(receiptsDir, filename);

    // Create PDF
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    // Basic receipt layout
    doc.fontSize(20).text('NuVizion Receipt', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Receipt for: ${name}`);
    doc.text(`Email: ${email}`);
    doc.text(`Transaction ID: ${txnId}`);
    doc.text(`Amount: $${amount}`);
    doc.text(`Date: ${new Date().toLocaleString()}`);
    doc.moveDown();
    doc.text('Thank you for your support!', { align: 'center' });

    doc.end();

    stream.on('finish', () => resolve(filePath));
    stream.on('error', reject);
  });
};
 