const multer = require('multer');

// Memory storage is ideal for transient conversion tasks
const storage = multer.memoryStorage();

const upload = multer({ 
    storage: storage,
    limits: { 
        fileSize: 50 * 1024 * 1024 // 50MB per file
    }
});

module.exports = upload;
