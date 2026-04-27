const express = require('express');
const router = express.Router();
const Link = require('../models/Link');

// @route   GET /r/:subdomain
// @desc    Redirect to original URL based on subdomain/path
router.get('/r/:subdomain', async (req, res) => {
  try {
    const { subdomain } = req.params;
    
    console.log(`🔍 Redirecting for link: ${subdomain}`);

    const link = await Link.findOne({
      subdomain: subdomain.toLowerCase(),
      isActive: true,
    });

    if (!link) {
      console.log(`❌ Redirect failed: No link found for ${subdomain}`);
      return res.status(404).send(`
        <html>
          <body style="font-family: sans-serif; display: flex; align-items: center; justify-center; height: 100vh; margin:0; background: #fff; color: #111; text-align: center;">
            <div style="max-width: 400px; padding: 40px; border: 1px solid #eee; border-radius: 20px;">
              <h1 style="font-weight: 900; margin:0;">404</h1>
              <p style="font-weight: bold; color: #ff3b30;">Link Not Found</p>
              <p style="font-size: 14px; color: #666;">The link "/r/${subdomain}" has not been registered or is no longer active.</p>
              <a href="/" style="display: inline-block; padding: 12px 24px; background: #111; color: #fff; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 14px;">Go Home</a>
            </div>
          </body>
        </html>
      `);
    }

    // Increment click count
    Link.updateOne({ _id: link._id }, { $inc: { clickCount: 1 } }).catch(err => console.error('Stats error:', err));

    // Implementation of URL Masking
    console.log(`✅ Masking URL for: ${link.originalUrl}`);
    
    return res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subdomain.charAt(0).toUpperCase() + subdomain.slice(1)} | Toolza Masked</title>
          <style>
            body, html {
              margin: 0;
              padding: 0;
              height: 100%;
              width: 100%;
              overflow: hidden;
              background-color: #fff;
            }
            iframe {
              border: none;
              width: 100%;
              height: 100%;
            }
            .fallback {
              position: absolute;
              top: 20px;
              left: 20px;
              background: rgba(0,0,0,0.8);
              color: white;
              padding: 10px 20px;
              border-radius: 8px;
              font-family: sans-serif;
              text-decoration: none;
              font-size: 12px;
              z-index: 9999;
              display: none; /* Only show if needed or by default */
            }
          </style>
        </head>
        <body>
          <iframe 
            src="${link.originalUrl}" 
            title="${subdomain}"
            sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
          >
            <p>Your browser does not support iframes. <a href="${link.originalUrl}">Click here to visit the site</a>.</p>
          </iframe>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Redirect Exception:', error);
    return res.status(500).json({ success: false, message: 'Masking Error' });
  }
});

module.exports = router;
