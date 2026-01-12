/**
 * Static Configuration Options
 * These are used by the frontend for dropdowns and selections
 */

const configOptions = {
  // Gender Options
  genders: [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'non-binary', label: 'Non-Binary' },
    { value: 'transgender', label: 'Transgender' },
    { value: 'other', label: 'Other' },
    { value: 'prefer_not_to_say', label: 'Prefer Not to Say' },
  ],

  // Interested In Options
  interestedIn: [
    { value: 'male', label: 'Men' },
    { value: 'female', label: 'Women' },
    { value: 'non-binary', label: 'Non-Binary' },
    { value: 'everyone', label: 'Everyone' },
  ],

  // Dating Intentions
  datingIntentions: [
    { value: 'long_term', label: 'Long-term Relationship' },
    { value: 'long_term_open_to_short', label: 'Long-term, Open to Short' },
    { value: 'short_term', label: 'Short-term Relationship' },
    { value: 'short_term_open_to_long', label: 'Short-term, Open to Long' },
    { value: 'casual', label: 'Casual Dating' },
    { value: 'new_friends', label: 'New Friends' },
    { value: 'still_figuring_out', label: 'Still Figuring It Out' },
  ],

  // Relationship Type
  relationshipTypes: [
    { value: 'monogamy', label: 'Monogamy' },
    { value: 'non_monogamy', label: 'Non-Monogamy' },
    { value: 'polyamory', label: 'Polyamory' },
    { value: 'open_relationship', label: 'Open Relationship' },
    { value: 'open_to_exploring', label: 'Open to Exploring' },
  ],

  // Religion
  religions: [
    { value: 'agnostic', label: 'Agnostic' },
    { value: 'atheist', label: 'Atheist' },
    { value: 'buddhist', label: 'Buddhist' },
    { value: 'catholic', label: 'Catholic' },
    { value: 'christian', label: 'Christian' },
    { value: 'hindu', label: 'Hindu' },
    { value: 'jewish', label: 'Jewish' },
    { value: 'muslim', label: 'Muslim' },
    { value: 'sikh', label: 'Sikh' },
    { value: 'spiritual', label: 'Spiritual' },
    { value: 'other', label: 'Other' },
    { value: 'prefer_not_to_say', label: 'Prefer Not to Say' },
  ],

  // Family Plans
  familyPlans: [
    { value: 'want_children', label: 'Want Children' },
    { value: 'dont_want_children', label: "Don't Want Children" },
    { value: 'have_children_want_more', label: 'Have Children, Want More' },
    { value: 'have_children_dont_want_more', label: "Have Children, Don't Want More" },
    { value: 'not_sure', label: 'Not Sure Yet' },
    { value: 'prefer_not_to_say', label: 'Prefer Not to Say' },
  ],

  // Education Level
  educationLevels: [
    { value: 'high_school', label: 'High School' },
    { value: 'some_college', label: 'Some College' },
    { value: 'associate', label: 'Associate Degree' },
    { value: 'bachelors', label: "Bachelor's Degree" },
    { value: 'masters', label: "Master's Degree" },
    { value: 'doctorate', label: 'Doctorate' },
    { value: 'professional', label: 'Professional Degree' },
    { value: 'trade_school', label: 'Trade/Vocational School' },
    { value: 'prefer_not_to_say', label: 'Prefer Not to Say' },
  ],

  // Drinking Habits
  drinkingHabits: [
    { value: 'never', label: 'Never' },
    { value: 'rarely', label: 'Rarely' },
    { value: 'socially', label: 'Socially' },
    { value: 'regularly', label: 'Regularly' },
    { value: 'prefer_not_to_say', label: 'Prefer Not to Say' },
  ],

  // Smoking Habits
  smokingHabits: [
    { value: 'never', label: 'Never' },
    { value: 'occasionally', label: 'Occasionally' },
    { value: 'regularly', label: 'Regularly' },
    { value: 'trying_to_quit', label: 'Trying to Quit' },
    { value: 'prefer_not_to_say', label: 'Prefer Not to Say' },
  ],

  // Marijuana Usage
  marijuanaUsage: [
    { value: 'never', label: 'Never' },
    { value: 'occasionally', label: 'Occasionally' },
    { value: 'frequently', label: 'Frequently' },
    { value: 'prefer_not_to_say', label: 'Prefer Not to Say' },
  ],

  // Drugs Usage
  drugsUsage: [
    { value: 'never', label: 'Never' },
    { value: 'occasionally', label: 'Occasionally' },
    { value: 'prefer_not_to_say', label: 'Prefer Not to Say' },
  ],

  // Workout Habits
  workoutHabits: [
    { value: 'never', label: 'Never' },
    { value: 'rarely', label: 'Rarely' },
    { value: 'sometimes', label: 'Sometimes' },
    { value: 'often', label: 'Often' },
    { value: 'daily', label: 'Daily' },
  ],

  // Diet Preferences
  dietPreferences: [
    { value: 'omnivore', label: 'Omnivore' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'pescatarian', label: 'Pescatarian' },
    { value: 'keto', label: 'Keto' },
    { value: 'halal', label: 'Halal' },
    { value: 'kosher', label: 'Kosher' },
    { value: 'gluten_free', label: 'Gluten-Free' },
    { value: 'other', label: 'Other' },
  ],

  // Political Views
  politicalViews: [
    { value: 'liberal', label: 'Liberal' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'conservative', label: 'Conservative' },
    { value: 'not_political', label: 'Not Political' },
    { value: 'other', label: 'Other' },
    { value: 'prefer_not_to_say', label: 'Prefer Not to Say' },
  ],

  // Zodiac Signs
  zodiacSigns: [
    { value: 'aries', label: 'Aries', dateRange: 'Mar 21 - Apr 19' },
    { value: 'taurus', label: 'Taurus', dateRange: 'Apr 20 - May 20' },
    { value: 'gemini', label: 'Gemini', dateRange: 'May 21 - Jun 20' },
    { value: 'cancer', label: 'Cancer', dateRange: 'Jun 21 - Jul 22' },
    { value: 'leo', label: 'Leo', dateRange: 'Jul 23 - Aug 22' },
    { value: 'virgo', label: 'Virgo', dateRange: 'Aug 23 - Sep 22' },
    { value: 'libra', label: 'Libra', dateRange: 'Sep 23 - Oct 22' },
    { value: 'scorpio', label: 'Scorpio', dateRange: 'Oct 23 - Nov 21' },
    { value: 'sagittarius', label: 'Sagittarius', dateRange: 'Nov 22 - Dec 21' },
    { value: 'capricorn', label: 'Capricorn', dateRange: 'Dec 22 - Jan 19' },
    { value: 'aquarius', label: 'Aquarius', dateRange: 'Jan 20 - Feb 18' },
    { value: 'pisces', label: 'Pisces', dateRange: 'Feb 19 - Mar 20' },
  ],

  // Pets
  pets: [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'bird', label: 'Bird' },
    { value: 'fish', label: 'Fish' },
    { value: 'reptile', label: 'Reptile' },
    { value: 'rabbit', label: 'Rabbit' },
    { value: 'hamster', label: 'Hamster' },
    { value: 'other', label: 'Other Pet' },
    { value: 'no_pets', label: 'No Pets' },
    { value: 'allergic', label: 'Allergic to Pets' },
    { value: 'want_pet', label: 'Want a Pet' },
  ],

  // Languages
  languages: [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'italian', label: 'Italian' },
    { value: 'portuguese', label: 'Portuguese' },
    { value: 'russian', label: 'Russian' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'korean', label: 'Korean' },
    { value: 'arabic', label: 'Arabic' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'bengali', label: 'Bengali' },
    { value: 'punjabi', label: 'Punjabi' },
    { value: 'tamil', label: 'Tamil' },
    { value: 'telugu', label: 'Telugu' },
    { value: 'marathi', label: 'Marathi' },
    { value: 'gujarati', label: 'Gujarati' },
    { value: 'urdu', label: 'Urdu' },
    { value: 'dutch', label: 'Dutch' },
    { value: 'polish', label: 'Polish' },
    { value: 'turkish', label: 'Turkish' },
    { value: 'vietnamese', label: 'Vietnamese' },
    { value: 'thai', label: 'Thai' },
    { value: 'indonesian', label: 'Indonesian' },
    { value: 'malay', label: 'Malay' },
    { value: 'tagalog', label: 'Tagalog' },
    { value: 'swahili', label: 'Swahili' },
    { value: 'hebrew', label: 'Hebrew' },
    { value: 'greek', label: 'Greek' },
    { value: 'swedish', label: 'Swedish' },
    { value: 'norwegian', label: 'Norwegian' },
    { value: 'danish', label: 'Danish' },
    { value: 'finnish', label: 'Finnish' },
    { value: 'other', label: 'Other' },
  ],

  // Hobbies & Interests
  hobbies: [
    // Sports & Fitness
    { value: 'gym', label: 'Gym', category: 'Sports & Fitness' },
    { value: 'yoga', label: 'Yoga', category: 'Sports & Fitness' },
    { value: 'running', label: 'Running', category: 'Sports & Fitness' },
    { value: 'swimming', label: 'Swimming', category: 'Sports & Fitness' },
    { value: 'cycling', label: 'Cycling', category: 'Sports & Fitness' },
    { value: 'hiking', label: 'Hiking', category: 'Sports & Fitness' },
    { value: 'football', label: 'Football', category: 'Sports & Fitness' },
    { value: 'basketball', label: 'Basketball', category: 'Sports & Fitness' },
    { value: 'tennis', label: 'Tennis', category: 'Sports & Fitness' },
    { value: 'badminton', label: 'Badminton', category: 'Sports & Fitness' },
    { value: 'cricket', label: 'Cricket', category: 'Sports & Fitness' },
    { value: 'golf', label: 'Golf', category: 'Sports & Fitness' },
    { value: 'martial_arts', label: 'Martial Arts', category: 'Sports & Fitness' },
    { value: 'dancing', label: 'Dancing', category: 'Sports & Fitness' },
    { value: 'rock_climbing', label: 'Rock Climbing', category: 'Sports & Fitness' },
    { value: 'skiing', label: 'Skiing', category: 'Sports & Fitness' },
    { value: 'surfing', label: 'Surfing', category: 'Sports & Fitness' },
    { value: 'skateboarding', label: 'Skateboarding', category: 'Sports & Fitness' },

    // Music & Arts
    { value: 'music', label: 'Music', category: 'Music & Arts' },
    { value: 'singing', label: 'Singing', category: 'Music & Arts' },
    { value: 'playing_guitar', label: 'Playing Guitar', category: 'Music & Arts' },
    { value: 'playing_piano', label: 'Playing Piano', category: 'Music & Arts' },
    { value: 'djing', label: 'DJing', category: 'Music & Arts' },
    { value: 'painting', label: 'Painting', category: 'Music & Arts' },
    { value: 'drawing', label: 'Drawing', category: 'Music & Arts' },
    { value: 'photography', label: 'Photography', category: 'Music & Arts' },
    { value: 'filmmaking', label: 'Filmmaking', category: 'Music & Arts' },
    { value: 'writing', label: 'Writing', category: 'Music & Arts' },
    { value: 'poetry', label: 'Poetry', category: 'Music & Arts' },
    { value: 'crafts', label: 'Crafts', category: 'Music & Arts' },
    { value: 'pottery', label: 'Pottery', category: 'Music & Arts' },

    // Entertainment
    { value: 'movies', label: 'Movies', category: 'Entertainment' },
    { value: 'tv_shows', label: 'TV Shows', category: 'Entertainment' },
    { value: 'anime', label: 'Anime', category: 'Entertainment' },
    { value: 'concerts', label: 'Concerts', category: 'Entertainment' },
    { value: 'theater', label: 'Theater', category: 'Entertainment' },
    { value: 'comedy', label: 'Comedy', category: 'Entertainment' },
    { value: 'podcasts', label: 'Podcasts', category: 'Entertainment' },
    { value: 'gaming', label: 'Gaming', category: 'Entertainment' },
    { value: 'board_games', label: 'Board Games', category: 'Entertainment' },
    { value: 'karaoke', label: 'Karaoke', category: 'Entertainment' },

    // Food & Drink
    { value: 'cooking', label: 'Cooking', category: 'Food & Drink' },
    { value: 'baking', label: 'Baking', category: 'Food & Drink' },
    { value: 'wine_tasting', label: 'Wine Tasting', category: 'Food & Drink' },
    { value: 'craft_beer', label: 'Craft Beer', category: 'Food & Drink' },
    { value: 'coffee', label: 'Coffee', category: 'Food & Drink' },
    { value: 'foodie', label: 'Foodie', category: 'Food & Drink' },
    { value: 'brunch', label: 'Brunch', category: 'Food & Drink' },
    { value: 'bbq', label: 'BBQ', category: 'Food & Drink' },

    // Travel & Adventure
    { value: 'traveling', label: 'Traveling', category: 'Travel & Adventure' },
    { value: 'road_trips', label: 'Road Trips', category: 'Travel & Adventure' },
    { value: 'camping', label: 'Camping', category: 'Travel & Adventure' },
    { value: 'backpacking', label: 'Backpacking', category: 'Travel & Adventure' },
    { value: 'beach', label: 'Beach', category: 'Travel & Adventure' },
    { value: 'mountains', label: 'Mountains', category: 'Travel & Adventure' },
    { value: 'adventure_sports', label: 'Adventure Sports', category: 'Travel & Adventure' },
    { value: 'scuba_diving', label: 'Scuba Diving', category: 'Travel & Adventure' },

    // Lifestyle
    { value: 'reading', label: 'Reading', category: 'Lifestyle' },
    { value: 'gardening', label: 'Gardening', category: 'Lifestyle' },
    { value: 'meditation', label: 'Meditation', category: 'Lifestyle' },
    { value: 'volunteering', label: 'Volunteering', category: 'Lifestyle' },
    { value: 'fashion', label: 'Fashion', category: 'Lifestyle' },
    { value: 'shopping', label: 'Shopping', category: 'Lifestyle' },
    { value: 'spa', label: 'Spa & Wellness', category: 'Lifestyle' },
    { value: 'astrology', label: 'Astrology', category: 'Lifestyle' },

    // Social
    { value: 'partying', label: 'Partying', category: 'Social' },
    { value: 'nightlife', label: 'Nightlife', category: 'Social' },
    { value: 'networking', label: 'Networking', category: 'Social' },
    { value: 'social_activism', label: 'Social Activism', category: 'Social' },

    // Technology
    { value: 'technology', label: 'Technology', category: 'Technology' },
    { value: 'programming', label: 'Programming', category: 'Technology' },
    { value: 'startups', label: 'Startups', category: 'Technology' },
    { value: 'crypto', label: 'Crypto', category: 'Technology' },
    { value: 'ai', label: 'AI & Machine Learning', category: 'Technology' },

    // Pets & Animals
    { value: 'dogs', label: 'Dogs', category: 'Pets & Animals' },
    { value: 'cats', label: 'Cats', category: 'Pets & Animals' },
    { value: 'animals', label: 'Animals', category: 'Pets & Animals' },
    { value: 'horse_riding', label: 'Horse Riding', category: 'Pets & Animals' },
  ],

  // Communication Style
  communicationStyles: [
    { value: 'texter', label: 'Big Texter' },
    { value: 'phone_calls', label: 'Phone Calls' },
    { value: 'video_chats', label: 'Video Chats' },
    { value: 'in_person', label: 'Better in Person' },
  ],

  // Love Languages
  loveLanguages: [
    { value: 'words_of_affirmation', label: 'Words of Affirmation' },
    { value: 'quality_time', label: 'Quality Time' },
    { value: 'physical_touch', label: 'Physical Touch' },
    { value: 'acts_of_service', label: 'Acts of Service' },
    { value: 'receiving_gifts', label: 'Receiving Gifts' },
  ],

  // Sleeping Habits
  sleepingHabits: [
    { value: 'early_bird', label: 'Early Bird' },
    { value: 'night_owl', label: 'Night Owl' },
    { value: 'flexible', label: 'Flexible' },
  ],

  // Social Media Usage
  socialMediaUsage: [
    { value: 'very_active', label: 'Very Active' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'rarely', label: 'Rarely' },
    { value: 'not_on_social_media', label: 'Not on Social Media' },
  ],

  // Height Range (in cm)
  heightRange: {
    min: 100,
    max: 250,
    unit: 'cm',
  },

  // Age Range
  ageRange: {
    min: 18,
    max: 100,
  },

  // Distance Range (in km)
  distanceRange: {
    min: 1,
    max: 500,
    unit: 'km',
  },

  // Report Reasons
  reportReasons: [
    { value: 'fake_profile', label: 'Fake Profile' },
    { value: 'inappropriate_photos', label: 'Inappropriate Photos' },
    { value: 'harassment', label: 'Harassment' },
    { value: 'spam', label: 'Spam' },
    { value: 'scam', label: 'Scam' },
    { value: 'underage', label: 'Underage User' },
    { value: 'offensive_content', label: 'Offensive Content' },
    { value: 'other', label: 'Other' },
  ],

  // Verification Badge Types
  verificationTypes: [
    { value: 'photo_verified', label: 'Photo Verified' },
    { value: 'id_verified', label: 'ID Verified' },
    { value: 'phone_verified', label: 'Phone Verified' },
    { value: 'email_verified', label: 'Email Verified' },
  ],
};

module.exports = configOptions;
