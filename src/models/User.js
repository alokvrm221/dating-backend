const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    // Basic Information
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: [50, 'First name cannot exceed 50 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxlength: [50, 'Last name cannot exceed 50 characters'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      sparse: true, // Allow null/undefined, but if present must be unique
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    // Password removed - using OTP authentication only
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    phoneVerifiedAt: {
      type: Date,
    },

    // Profile Information
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: ['male', 'female', 'non-binary', 'other'],
    },
    interestedIn: {
      type: [String],
      required: [true, 'Interest preference is required'],
      enum: ['male', 'female', 'non-binary', 'other', 'everyone'],
    },
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot exceed 500 characters'],
      trim: true,
    },
    occupation: {
      type: String,
      maxlength: [100, 'Occupation cannot exceed 100 characters'],
      trim: true,
    },
    education: {
      type: String,
      maxlength: [100, 'Education cannot exceed 100 characters'],
      trim: true,
    },
    educationLevel: {
      type: String,
      enum: [
        'high_school',
        'some_college',
        'associate',
        'bachelors',
        'masters',
        'doctorate',
        'professional',
        'trade_school',
        'prefer_not_to_say',
      ],
    },
    height: {
      type: Number, // in cm
      min: [100, 'Height must be at least 100 cm'],
      max: [250, 'Height cannot exceed 250 cm'],
    },

    // Location
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        index: '2dsphere',
      },
      city: String,
      country: String,
    },

    // Photos
    photos: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: String, // Cloudinary public ID
        isPrimary: {
          type: Boolean,
          default: false,
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Preferences
    preferences: {
      ageRange: {
        min: {
          type: Number,
          default: 18,
          min: 18,
        },
        max: {
          type: Number,
          default: 80,
          max: 100,
        },
      },
      maxDistance: {
        type: Number,
        default: 50, // in km
        min: 1,
        max: 500,
      },
      showMe: {
        type: String,
        enum: ['male', 'female', 'non-binary', 'other', 'everyone'],
        default: 'everyone',
      },
    },

    // Interests & Hobbies
    interests: [
      {
        type: String,
        trim: true,
      },
    ],

    // Dating & Relationship
    datingIntention: {
      type: String,
      enum: [
        'long_term',
        'long_term_open_to_short',
        'short_term',
        'short_term_open_to_long',
        'casual',
        'new_friends',
        'still_figuring_out',
      ],
    },
    relationshipType: {
      type: String,
      enum: [
        'monogamy',
        'non_monogamy',
        'polyamory',
        'open_relationship',
        'open_to_exploring',
      ],
    },

    // Religion & Beliefs
    religion: {
      type: String,
      enum: [
        'agnostic',
        'atheist',
        'buddhist',
        'catholic',
        'christian',
        'hindu',
        'jewish',
        'muslim',
        'sikh',
        'spiritual',
        'other',
        'prefer_not_to_say',
      ],
    },
    politicalViews: {
      type: String,
      enum: [
        'liberal',
        'moderate',
        'conservative',
        'not_political',
        'other',
        'prefer_not_to_say',
      ],
    },

    // Family
    familyPlans: {
      type: String,
      enum: [
        'want_children',
        'dont_want_children',
        'have_children_want_more',
        'have_children_dont_want_more',
        'not_sure',
        'prefer_not_to_say',
      ],
    },

    // Lifestyle Habits
    drinkingHabit: {
      type: String,
      enum: ['never', 'rarely', 'socially', 'regularly', 'prefer_not_to_say'],
    },
    smokingHabit: {
      type: String,
      enum: ['never', 'occasionally', 'regularly', 'trying_to_quit', 'prefer_not_to_say'],
    },
    marijuanaUsage: {
      type: String,
      enum: ['never', 'occasionally', 'frequently', 'prefer_not_to_say'],
    },
    workoutHabit: {
      type: String,
      enum: ['never', 'rarely', 'sometimes', 'often', 'daily'],
    },
    dietPreference: {
      type: String,
      enum: [
        'omnivore',
        'vegetarian',
        'vegan',
        'pescatarian',
        'keto',
        'halal',
        'kosher',
        'gluten_free',
        'other',
      ],
    },
    sleepingHabit: {
      type: String,
      enum: ['early_bird', 'night_owl', 'flexible'],
    },

    // Personal Traits
    zodiacSign: {
      type: String,
      enum: [
        'aries',
        'taurus',
        'gemini',
        'cancer',
        'leo',
        'virgo',
        'libra',
        'scorpio',
        'sagittarius',
        'capricorn',
        'aquarius',
        'pisces',
      ],
    },
    communicationStyle: {
      type: String,
      enum: ['texter', 'phone_calls', 'video_chats', 'in_person'],
    },
    loveLanguage: {
      type: String,
      enum: [
        'words_of_affirmation',
        'quality_time',
        'physical_touch',
        'acts_of_service',
        'receiving_gifts',
      ],
    },

    // Pets
    pets: [
      {
        type: String,
        enum: [
          'dog',
          'cat',
          'bird',
          'fish',
          'reptile',
          'rabbit',
          'hamster',
          'other',
          'no_pets',
          'allergic',
          'want_pet',
        ],
      },
    ],

    // Languages spoken
    languages: [
      {
        type: String,
        trim: true,
      },
    ],

    // Social Media
    socialMediaUsage: {
      type: String,
      enum: ['very_active', 'moderate', 'rarely', 'not_on_social_media'],
    },

    // Account Status
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    premiumExpiresAt: Date,

    // Privacy Settings
    privacySettings: {
      showAge: {
        type: Boolean,
        default: true,
      },
      showDistance: {
        type: Boolean,
        default: true,
      },
      showOnlineStatus: {
        type: Boolean,
        default: true,
      },
      incognitoMode: {
        type: Boolean,
        default: false,
      },
    },

    // Activity Tracking
    lastActive: {
      type: Date,
      default: Date.now,
    },
    lastLocation: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: [Number],
    },

    // Statistics
    stats: {
      totalSwipes: {
        type: Number,
        default: 0,
      },
      totalMatches: {
        type: Number,
        default: 0,
      },
      profileViews: {
        type: Number,
        default: 0,
      },
    },

    // Blocked Users
    blockedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    // Reported Users
    reportedUsers: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        reason: String,
        reportedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Tokens
    refreshToken: {
      type: String,
      select: false,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,

    // Terms & Conditions
    agreedToTerms: {
      type: Boolean,
      required: true,
      default: false,
    },
    agreedToPrivacyPolicy: {
      type: Boolean,
      required: true,
      default: false,
    },
    termsAgreedAt: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
userSchema.index({ phoneNumber: 1 });
userSchema.index({ email: 1 }, { sparse: true });
userSchema.index({ 'location.coordinates': '2dsphere' });
userSchema.index({ isActive: 1, isVerified: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ lastActive: -1 });

// Virtual for age calculation
userSchema.virtual('age').get(function () {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

// Virtual for primary photo
userSchema.virtual('primaryPhoto').get(function () {
  const primary = this.photos.find((photo) => photo.isPrimary);
  return primary || this.photos[0] || null;
});

// Password-related methods removed - using OTP authentication only

// Method to check if user is online (active in last 5 minutes)
userSchema.methods.isOnline = function () {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  return this.lastActive >= fiveMinutesAgo;
};

// Method to update last active timestamp
userSchema.methods.updateLastActive = async function () {
  this.lastActive = Date.now();
  await this.save({ validateBeforeSave: false });
};

// Static method to find users within distance
userSchema.statics.findNearby = function (coordinates, maxDistance, filters = {}) {
  return this.find({
    'location.coordinates': {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: coordinates,
        },
        $maxDistance: maxDistance * 1000, // Convert km to meters
      },
    },
    isActive: true,
    isVerified: true,
    ...filters,
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;

