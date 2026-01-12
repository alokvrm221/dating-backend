const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema(
  {
    // The two users who matched
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],

    // Match status
    status: {
      type: String,
      enum: ['active', 'unmatched', 'blocked'],
      default: 'active',
    },

    // Match metadata
    matchedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },

    // Last message timestamp (for sorting)
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },

    // Unmatched information
    unmatchedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    unmatchedAt: Date,
    unmatchReason: String,

    // Whether users have started conversation
    hasConversation: {
      type: Boolean,
      default: false,
    },

    // Message count
    messageCount: {
      type: Number,
      default: 0,
    },

    // Match quality score (for analytics)
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes
matchSchema.index({ users: 1, status: 1 });
matchSchema.index({ matchedAt: -1 });
matchSchema.index({ lastMessageAt: -1 });
matchSchema.index({ status: 1, lastMessageAt: -1 });

// Ensure users array has exactly 2 users and no duplicates
matchSchema.pre('save', function (next) {
  if (this.users.length !== 2) {
    return next(new Error('Match must have exactly 2 users'));
  }
  if (this.users[0].toString() === this.users[1].toString()) {
    return next(new Error('Cannot match user with themselves'));
  }
  next();
});

// Static method to find match between two users
matchSchema.statics.findMatchBetween = async function (userId1, userId2) {
  return await this.findOne({
    users: { $all: [userId1, userId2] },
    status: 'active',
  });
};

// Static method to get user's matches
matchSchema.statics.getUserMatches = async function (userId, status = 'active') {
  return await this.find({
    users: userId,
    status: status,
  })
    .sort({ lastMessageAt: -1 })
    .populate({
      path: 'users',
      match: { _id: { $ne: userId } },
      select: 'firstName age photos bio location lastActive',
    });
};

// Static method to unmatch
matchSchema.statics.unmatch = async function (matchId, userId, reason = null) {
  return await this.findByIdAndUpdate(
    matchId,
    {
      status: 'unmatched',
      unmatchedBy: userId,
      unmatchedAt: Date.now(),
      unmatchReason: reason,
    },
    { new: true }
  );
};

// Method to check if user is part of this match
matchSchema.methods.includesUser = function (userId) {
  return this.users.some((user) => user.toString() === userId.toString());
};

// Method to get the other user in the match
matchSchema.methods.getOtherUser = function (userId) {
  return this.users.find((user) => user.toString() !== userId.toString());
};

// Method to update last message timestamp
matchSchema.methods.updateLastMessage = async function () {
  this.lastMessageAt = Date.now();
  this.hasConversation = true;
  this.messageCount += 1;
  await this.save();
};

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;

