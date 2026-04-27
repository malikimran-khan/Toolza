const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema(
  {
    subdomain: {
      type: String,
      required: [true, 'Subdomain is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/, 'Subdomain can only contain lowercase letters, numbers, and hyphens'],
      maxlength: [63, 'Subdomain cannot be longer than 63 characters'],
    },
    originalUrl: {
      type: String,
      required: [true, 'Original URL is required'],
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    clickCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Index for fast lookups (subdomain is already indexed by unique: true)
linkSchema.index({ userId: 1 });

// Virtual for generated URL
linkSchema.virtual('generatedUrl').get(function () {
  const baseDomain = process.env.BASE_DOMAIN || 'toolza.com';
  return `${this.subdomain}.${baseDomain}`;
});

// Ensure virtuals are included in JSON
linkSchema.set('toJSON', { virtuals: true });
linkSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Link', linkSchema);
