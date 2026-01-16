const mongoose = require('mongoose');

const appConfigSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    value: {
      type: mongoose.Schema.Types.Mixed, // Can store any type
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ['general', 'api', 'feature', 'ui', 'payment', 'notification'],
      default: 'general',
    },
    isPublic: {
      type: Boolean,
      default: false, // If true, can be fetched without auth
    },
    isEditable: {
      type: Boolean,
      default: true, // If false, cannot be updated via API
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
appConfigSchema.index({ key: 1 });
appConfigSchema.index({ category: 1 });
appConfigSchema.index({ isPublic: 1 });

const AppConfig = mongoose.model('AppConfig', appConfigSchema);

module.exports = AppConfig;

