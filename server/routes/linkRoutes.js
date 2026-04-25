const express = require('express');
const router = express.Router();
const Link = require('../models/Link');
const { optionalAuth } = require('../middleware/auth');

// @route   POST /api/links
// @desc    Create a new URL mapping
// @access  Public (optionally authenticated)
router.post('/', optionalAuth, async (req, res, next) => {
  try {
    const { subdomain, originalUrl } = req.body;

    if (!subdomain || !originalUrl) {
      return res.status(400).json({
        success: false,
        message: 'Subdomain and original URL are required',
      });
    }

    // Ensure the URL has a protocol
    let formattedUrl = originalUrl.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    // Reserved subdomains that can't be used
    const reserved = ['www', 'api', 'app', 'admin', 'mail', 'ftp', 'ns1', 'ns2'];
    if (reserved.includes(subdomain.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: `"${subdomain}" is a reserved subdomain and cannot be used`,
      });
    }

    const link = await Link.create({
      subdomain: subdomain.toLowerCase().trim(),
      originalUrl: formattedUrl,
      userId: req.user ? req.user._id : null,
    });

    res.status(201).json({
      success: true,
      data: link,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/links
// @desc    Get all links (optionally filtered by user)
// @access  Public
router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const query = {};

    // If authenticated, optionally filter by user
    if (req.user && req.query.mine === 'true') {
      query.userId = req.user._id;
    }

    const links = await Link.find(query).sort({ createdAt: -1 }).limit(100);

    res.json({
      success: true,
      count: links.length,
      data: links,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/links/:id
// @desc    Get a single link by ID
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const link = await Link.findById(req.params.id);

    if (!link) {
      return res.status(404).json({
        success: false,
        message: 'Link not found',
      });
    }

    res.json({
      success: true,
      data: link,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/links/:id/stats
// @desc    Get click stats for a link
// @access  Public
router.get('/:id/stats', async (req, res, next) => {
  try {
    const link = await Link.findById(req.params.id).select('subdomain clickCount createdAt');

    if (!link) {
      return res.status(404).json({
        success: false,
        message: 'Link not found',
      });
    }

    res.json({
      success: true,
      data: {
        subdomain: link.subdomain,
        clickCount: link.clickCount,
        createdAt: link.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/links/:id
// @desc    Delete a link
// @access  Public (should be protected in production)
router.delete('/:id', async (req, res, next) => {
  try {
    const link = await Link.findByIdAndDelete(req.params.id);

    if (!link) {
      return res.status(404).json({
        success: false,
        message: 'Link not found',
      });
    }

    res.json({
      success: true,
      message: 'Link deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
