const pdfService = require('../services/pdfService');
const archiver = require('archiver');

const fromImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No images uploaded' });
        }
        const pdfBytes = await pdfService.generatePdfFromImages(req.files);
        res.set('Content-Type', 'application/pdf');
        res.set('Content-Disposition', 'attachment; filename=generated.pdf');
        res.send(Buffer.from(pdfBytes));
    } catch (error) {
        res.status(500).json({ error: 'PDF generation failed' });
    }
};

const toImages = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No PDF uploaded' });
        const pages = await pdfService.pdfToImages(req.file.buffer);

        if (pages.length === 1) {
            res.set('Content-Type', 'image/png');
            res.set('Content-Disposition', 'attachment; filename=page_1.png');
            return res.send(pages[0].content);
        }

        const archive = archiver('zip');
        res.set('Content-Type', 'application/zip');
        res.set('Content-Disposition', 'attachment; filename=pdf_pages.zip');
        archive.pipe(res);
        pages.forEach((p, i) => archive.append(p.content, { name: `page_${i + 1}.png` }));
        await archive.finalize();
    } catch (error) {
        res.status(500).json({ error: 'PDF-to-Image failed' });
    }
};

const toWord = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No PDF uploaded' });
        console.log(`[MediaService] Converting PDF to Word: ${req.file.originalname} (${req.file.size} bytes)`);
        
        const docBuffer = await pdfService.pdfToWord(req.file.buffer);
        
        res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.set('Content-Disposition', `attachment; filename="converted_${Date.now()}.docx"`);
        res.send(docBuffer);
        
        console.log(`[MediaService] Successfully converted: ${req.file.originalname}`);
    } catch (error) {
        console.error('[MediaService] Word conversion error:', error);
        res.status(500).json({ 
            error: 'Word conversion failed', 
            details: error.message,
            suggestion: 'The PDF might be scanned or password protected.'
        });
    }
};

const merge = async (req, res) => {
    try {
        if (!req.files || req.files.length < 2) {
            return res.status(400).json({ error: 'At least 2 PDFs required' });
        }
        const pdfBytes = await pdfService.mergePdfs(req.files);
        res.set('Content-Type', 'application/pdf');
        res.set('Content-Disposition', 'attachment; filename=merged.pdf');
        res.send(Buffer.from(pdfBytes));
    } catch (error) {
        res.status(500).json({ error: 'Merging failed' });
    }
};

module.exports = {
    fromImages,
    toImages,
    toWord,
    merge
};
