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

    console.log(`✅ Redirecting to: ${link.originalUrl}`);
    return res.redirect(301, link.originalUrl);
  } catch (error) {
    console.error('Redirect Exception:', error);
    return res.status(500).json({ success: false, message: 'Redirect Error' });
  }
});

module.exports = router;
