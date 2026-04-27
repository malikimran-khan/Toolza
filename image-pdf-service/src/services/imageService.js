const sharp = require('sharp');

const convertImage = async (buffer, format = 'png', quality = 85) => {
    let transformer = sharp(buffer);

    switch(format.toLowerCase()) {
        case 'jpg':
        case 'jpeg':
            transformer = transformer.jpeg({ quality: parseInt(quality) });
            break;
        case 'webp':
            transformer = transformer.webp({ quality: parseInt(quality) });
            break;
        case 'png':
            transformer = transformer.png();
            break;
        case 'tiff':
            transformer = transformer.tiff();
            break;
        default:
            transformer = transformer.toFormat(format);
    }

    return await transformer.toBuffer();
};

module.exports = {
    convertImage
};
