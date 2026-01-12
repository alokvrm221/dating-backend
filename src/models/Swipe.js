const mongoose = require('mongoose');

const swipeSchema = new mongoose.Schema(
  {
    // User who performed the swipe
    swiperId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    // User who was swiped on
    swipedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    // Swipe action
    action: {
      type: String,
      required: true,
      enum: ['like', 'dislike', 'superlike'],
    },

    // Whether this swipe resulted in a match
    isMatch: {
      type: Boolean,
      default: false,
    },

    // Match reference (if matched)
    matchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Match',
    },

    // Swipe metadata
    swipedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },

    // Location where swipe occurred
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: [Number],
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for efficient queries
swipeSchema.index({ swiperId: 1, swipedUserId: 1 }, { unique: true });
swipeSchema.index({ swiperId: 1, action: 1, swipedAt: -1 });
swipeSchema.index({ swipedUserId: 1, action: 1, swipedAt: -1 });
swipeSchema.index({ isMatch: 1, swipedAt: -1 });

// Static method to check if user has already swiped
swipeSchema.statics.hasUserSwiped = async function (swiperId, swipedUserId) {
  const swipe = await this.findOne({ swiperId, swipedUserId });
  return !!swipe;
};

// Static method to get swipe between two users
swipeSchema.statics.getSwipeBetween = async function (userId1, userId2) {
  return await this.findOne({
    $or: [
      { swiperId: userId1, swipedUserId: userId2 },
      { swiperId: userId2, swipedUserId: userId1 },
    ],
  });
};

// Static method to check for mutual like (match)
swipeSchema.statics.checkForMatch = async function (swiperId, swipedUserId) {
  // Check if the other user has already liked this user
  const reciprocalSwipe = await this.findOne({
    swiperId: swipedUserId,
    swipedUserId: swiperId,
    action: { $in: ['like', 'superlike'] },
  });

  return !!reciprocalSwipe;
};

// Static method to get user's swipe history
swipeSchema.statics.getUserSwipeHistory = async function (userId, limit = 50) {
  return await this.find({ swiperId: userId })
    .sort({ swipedAt: -1 })
    .limit(limit)
    .populate('swipedUserId', 'firstName photos');
};

// Static method to get users who liked a specific user
swipeSchema.statics.getUsersWhoLiked = async function (userId) {
  return await this.find({
    swipedUserId: userId,
    action: { $in: ['like', 'superlike'] },
    isMatch: false,
  })
    .sort({ swipedAt: -1 })
    .populate('swiperId', 'firstName age photos bio location');
};

const Swipe = mongoose.model('Swipe', swipeSchema);

module.exports = Swipe;

