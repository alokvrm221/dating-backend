const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    // Match reference
    matchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Match',
      required: true,
      index: true,
    },

    // Sender
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    // Receiver
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    // Message content
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },

    // Message type
    type: {
      type: String,
      enum: ['text', 'image', 'gif', 'emoji'],
      default: 'text',
    },

    // Media URL (for images/gifs)
    mediaUrl: String,

    // Read status
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: Date,

    // Delivery status
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: Date,

    // Deleted status
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    // Timestamp
    sentAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for efficient queries
messageSchema.index({ matchId: 1, sentAt: -1 });
messageSchema.index({ senderId: 1, receiverId: 1, sentAt: -1 });
messageSchema.index({ receiverId: 1, isRead: 1 });

// Static method to get conversation messages
messageSchema.statics.getConversation = async function (matchId, limit = 50, skip = 0) {
  return await this.find({
    matchId,
    isDeleted: false,
  })
    .sort({ sentAt: -1 })
    .limit(limit)
    .skip(skip)
    .populate('senderId', 'firstName photos')
    .populate('receiverId', 'firstName photos');
};

// Static method to mark messages as read
messageSchema.statics.markAsRead = async function (matchId, userId) {
  return await this.updateMany(
    {
      matchId,
      receiverId: userId,
      isRead: false,
    },
    {
      isRead: true,
      readAt: Date.now(),
    }
  );
};

// Static method to get unread message count
messageSchema.statics.getUnreadCount = async function (userId) {
  return await this.countDocuments({
    receiverId: userId,
    isRead: false,
    isDeleted: false,
  });
};

// Static method to delete message
messageSchema.statics.deleteMessage = async function (messageId, userId) {
  return await this.findByIdAndUpdate(
    messageId,
    {
      isDeleted: true,
      deletedAt: Date.now(),
      deletedBy: userId,
    },
    { new: true }
  );
};

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

