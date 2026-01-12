const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    // Reporter
    reporterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    // Reported user
    reportedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    // Report reason
    reason: {
      type: String,
      required: true,
      enum: [
        'inappropriate_photos',
        'fake_profile',
        'harassment',
        'spam',
        'underage',
        'offensive_content',
        'scam',
        'other',
      ],
    },

    // Additional details
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      trim: true,
    },

    // Report status
    status: {
      type: String,
      enum: ['pending', 'reviewing', 'resolved', 'dismissed'],
      default: 'pending',
    },

    // Admin notes
    adminNotes: String,
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reviewedAt: Date,

    // Action taken
    actionTaken: {
      type: String,
      enum: ['none', 'warning', 'temporary_ban', 'permanent_ban', 'profile_removed'],
    },

    // Timestamps
    reportedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
reportSchema.index({ reporterId: 1, reportedUserId: 1 });
reportSchema.index({ status: 1, reportedAt: -1 });

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;

