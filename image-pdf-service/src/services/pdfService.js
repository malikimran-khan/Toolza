const { PDFDocument } = require('pdf-lib');
const { pdfToPng } = require('pdf-to-png-converter');
const { Document, Packer, Paragraph, TextRun, PageBreak } = require('docx');
const sharp = require('sharp');

// Dynamic import for pdfjs-dist (modern ESM)
let pdfjsLib;
const getPdfJs = async () => {
    if (!pdfjsLib) {
        pdfjsLib = await import('pdfjs-dist/build/pdf.mjs');
        // Handle worker in Node environment
        if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
            const worker = await import('pdfjs-dist/build/pdf.worker.mjs');
            pdfjsLib.GlobalWorkerOptions.workerSrc = worker;
        }
    }
    return pdfjsLib;
};

const generatePdfFromImages = async (files) => {
    const pdfDoc = await PDFDocument.create();
    for (const file of files) {
        const image = await pdfDoc.embedJpg(file.buffer).catch(async () => {
            const converted = await sharp(file.buffer).jpeg().toBuffer();
            return await pdfDoc.embedJpg(converted);
        });

        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
            x: 0,
            y: 0,
            width: image.width,
            height: image.height,
        });
    }
    return await pdfDoc.save();
};

const pdfToImages = async (buffer) => {
    return await pdfToPng(buffer, { viewportScale: 2.0 });
};

const pdfToWord = async (buffer) => {
    try {
        const { getDocument } = await getPdfJs();
        // Enable font loading to resolve 'encoded text' (cid) issues
        const loadingTask = getDocument({
            data: new Uint8Array(buffer),
            useSystemFonts: true,
            disableFontFace: false, // Must be false to map characters correctly
        });
        
        const pdf = await loadingTask.promise;
        const numPages = pdf.numPages;
        const docChildren = [];

        for (let i = 1; i <= numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            
            // Group text items by their Y-coordinate.
            // Using a threshold of 3 units helps group items that are slightly misaligned on the same line.
            const lines = {};
            textContent.items.forEach(item => {
                if (!item.str || item.str.trim() === '') return;
                
                const y = Math.round(item.transform[5] / 3) * 3; 
                if (!lines[y]) lines[y] = [];
                lines[y].push(item);
            });

            // Sort lines from top to bottom
            const sortedYs = Object.keys(lines).sort((a, b) => b - a);
            
            sortedYs.forEach(y => {
                // Sort items from left to right
                const lineItems = lines[y].sort((a, b) => a.transform[4] - b.transform[4]);
                
                let lineText = "";
                let lastX = -1;
                
                lineItems.forEach(item => {
                    const currentX = item.transform[4];
                    // If there's a significant gap between items, add a space
                    if (lastX !== -1 && currentX > lastX + 2) {
                        if (!lineText.endsWith(' ') && !item.str.startsWith(' ')) {
                            lineText += " ";
                        }
                    }
                    lineText += item.str;
                    lastX = currentX + (item.width || 0); 
                });
                
                if (lineText.trim()) {
                    docChildren.push(new Paragraph({
                        children: [new TextRun({
                            text: lineText,
                            font: "Arial",
                            size: 22,
                        })],
                        spacing: { after: 120 }
                    }));
                }
            });

            if (i < numPages) {
                docChildren.push(new Paragraph({ children: [new PageBreak()] }));
            }
        }

        const doc = new Document({
            sections: [{
                properties: {
                    page: {
                        margin: { top: 720, bottom: 720, left: 720, right: 720 }
                    }
                },
                children: docChildren,
            }],
        });

        return await Packer.toBuffer(doc);
    } catch (error) {
        console.error('PDF to Word Conversion Error:', error);
        throw error;
    }
};

const mergePdfs = async (files) => {
    const mergedPdf = await PDFDocument.create();
    for (const file of files) {
        const donorPdf = await PDFDocument.load(file.buffer);
        const copiedPages = await mergedPdf.copyPages(donorPdf, donorPdf.getPageIndices());
        copiedPages.forEach(page => mergedPdf.addPage(page));
    }
    return await mergedPdf.save();
};

module.exports = {
    generatePdfFromImages,
    pdfToImages,
    pdfToWord,
    mergePdfs
};

