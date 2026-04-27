const imageService = require('../services/imageService');

const convert = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image uploaded' });
        }
        
        const { format = 'png', quality = 85 } = req.body;
        const processedBuffer = await imageService.convertImage(req.file.buffer, format, quality);
        
        res.set('Content-Type', `image/${format}`);
        res.set('Content-Disposition', `attachment; filename=converted.${format}`);
        res.send(processedBuffer);
    } catch (error) {
        console.error('Image Controller Error:', error);
        res.status(500).json({ error: 'Image conversion failed' });
    }
};

module.exports = {
    convert
};
