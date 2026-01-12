# API Documentation

Complete API reference for the Dating App Backend.

## Table of Contents

1. [Configuration](#configuration)
2. [Authentication](#authentication)
3. [User Onboarding](#user-onboarding)
4. [User Management](#user-management)
5. [Swipe System](#swipe-system)
6. [Match System](#match-system)
7. [Filters & Search](#filters--search)
8. [Content Pages](#content-pages)
9. [Error Handling](#error-handling)
10. [Rate Limiting](#rate-limiting)

---

## Base URL

```
http://localhost:5000/api/v1
```

## Response Format

All API responses follow this standard format:

### Success Response
```json
{
  "success": true,
  "message": "Success message",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": ["Error detail 1", "Error detail 2"]
}
```

### Paginated Response
```json
{
  "success": true,
  "message": "Success message",
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

## Configuration

Static configuration options for frontend dropdowns and selections. **No authentication required.**

### Get All Config Options

Get all configuration options in a single request.

**Endpoint:** `GET /config`

**cURL:**
```bash
curl -X GET http://localhost:5000/api/v1/config
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Configuration options retrieved successfully",
  "data": {
    "genders": [
      { "value": "male", "label": "Male" },
      { "value": "female", "label": "Female" },
      { "value": "non-binary", "label": "Non-Binary" },
      { "value": "transgender", "label": "Transgender" },
      { "value": "other", "label": "Other" },
      { "value": "prefer_not_to_say", "label": "Prefer Not to Say" }
    ],
    "interestedIn": [
      { "value": "male", "label": "Men" },
      { "value": "female", "label": "Women" },
      { "value": "non-binary", "label": "Non-Binary" },
      { "value": "everyone", "label": "Everyone" }
    ],
    "datingIntentions": [
      { "value": "long_term", "label": "Long-term Relationship" },
      { "value": "long_term_open_to_short", "label": "Long-term, Open to Short" },
      { "value": "short_term", "label": "Short-term Relationship" },
      { "value": "short_term_open_to_long", "label": "Short-term, Open to Long" },
      { "value": "casual", "label": "Casual Dating" },
      { "value": "new_friends", "label": "New Friends" },
      { "value": "still_figuring_out", "label": "Still Figuring It Out" }
    ],
    "relationshipTypes": [
      { "value": "monogamy", "label": "Monogamy" },
      { "value": "non_monogamy", "label": "Non-Monogamy" },
      { "value": "polyamory", "label": "Polyamory" },
      { "value": "open_relationship", "label": "Open Relationship" },
      { "value": "open_to_exploring", "label": "Open to Exploring" }
    ],
    "religions": [
      { "value": "agnostic", "label": "Agnostic" },
      { "value": "atheist", "label": "Atheist" },
      { "value": "buddhist", "label": "Buddhist" },
      { "value": "catholic", "label": "Catholic" },
      { "value": "christian", "label": "Christian" },
      { "value": "hindu", "label": "Hindu" },
      { "value": "jewish", "label": "Jewish" },
      { "value": "muslim", "label": "Muslim" },
      { "value": "sikh", "label": "Sikh" },
      { "value": "spiritual", "label": "Spiritual" },
      { "value": "other", "label": "Other" },
      { "value": "prefer_not_to_say", "label": "Prefer Not to Say" }
    ],
    "familyPlans": [
      { "value": "want_children", "label": "Want Children" },
      { "value": "dont_want_children", "label": "Don't Want Children" },
      { "value": "have_children_want_more", "label": "Have Children, Want More" },
      { "value": "have_children_dont_want_more", "label": "Have Children, Don't Want More" },
      { "value": "not_sure", "label": "Not Sure Yet" },
      { "value": "prefer_not_to_say", "label": "Prefer Not to Say" }
    ],
    "educationLevels": [
      { "value": "high_school", "label": "High School" },
      { "value": "some_college", "label": "Some College" },
      { "value": "associate", "label": "Associate Degree" },
      { "value": "bachelors", "label": "Bachelor's Degree" },
      { "value": "masters", "label": "Master's Degree" },
      { "value": "doctorate", "label": "Doctorate" },
      { "value": "professional", "label": "Professional Degree" },
      { "value": "trade_school", "label": "Trade/Vocational School" },
      { "value": "prefer_not_to_say", "label": "Prefer Not to Say" }
    ],
    "drinkingHabits": [
      { "value": "never", "label": "Never" },
      { "value": "rarely", "label": "Rarely" },
      { "value": "socially", "label": "Socially" },
      { "value": "regularly", "label": "Regularly" },
      { "value": "prefer_not_to_say", "label": "Prefer Not to Say" }
    ],
    "smokingHabits": [
      { "value": "never", "label": "Never" },
      { "value": "occasionally", "label": "Occasionally" },
      { "value": "regularly", "label": "Regularly" },
      { "value": "trying_to_quit", "label": "Trying to Quit" },
      { "value": "prefer_not_to_say", "label": "Prefer Not to Say" }
    ],
    "workoutHabits": [
      { "value": "never", "label": "Never" },
      { "value": "rarely", "label": "Rarely" },
      { "value": "sometimes", "label": "Sometimes" },
      { "value": "often", "label": "Often" },
      { "value": "daily", "label": "Daily" }
    ],
    "dietPreferences": [
      { "value": "omnivore", "label": "Omnivore" },
      { "value": "vegetarian", "label": "Vegetarian" },
      { "value": "vegan", "label": "Vegan" },
      { "value": "pescatarian", "label": "Pescatarian" },
      { "value": "keto", "label": "Keto" },
      { "value": "halal", "label": "Halal" },
      { "value": "kosher", "label": "Kosher" },
      { "value": "gluten_free", "label": "Gluten-Free" },
      { "value": "other", "label": "Other" }
    ],
    "politicalViews": [
      { "value": "liberal", "label": "Liberal" },
      { "value": "moderate", "label": "Moderate" },
      { "value": "conservative", "label": "Conservative" },
      { "value": "not_political", "label": "Not Political" },
      { "value": "other", "label": "Other" },
      { "value": "prefer_not_to_say", "label": "Prefer Not to Say" }
    ],
    "zodiacSigns": [
      { "value": "aries", "label": "Aries", "dateRange": "Mar 21 - Apr 19" },
      { "value": "taurus", "label": "Taurus", "dateRange": "Apr 20 - May 20" },
      { "value": "gemini", "label": "Gemini", "dateRange": "May 21 - Jun 20" },
      { "value": "cancer", "label": "Cancer", "dateRange": "Jun 21 - Jul 22" },
      { "value": "leo", "label": "Leo", "dateRange": "Jul 23 - Aug 22" },
      { "value": "virgo", "label": "Virgo", "dateRange": "Aug 23 - Sep 22" },
      { "value": "libra", "label": "Libra", "dateRange": "Sep 23 - Oct 22" },
      { "value": "scorpio", "label": "Scorpio", "dateRange": "Oct 23 - Nov 21" },
      { "value": "sagittarius", "label": "Sagittarius", "dateRange": "Nov 22 - Dec 21" },
      { "value": "capricorn", "label": "Capricorn", "dateRange": "Dec 22 - Jan 19" },
      { "value": "aquarius", "label": "Aquarius", "dateRange": "Jan 20 - Feb 18" },
      { "value": "pisces", "label": "Pisces", "dateRange": "Feb 19 - Mar 20" }
    ],
    "pets": [
      { "value": "dog", "label": "Dog" },
      { "value": "cat", "label": "Cat" },
      { "value": "bird", "label": "Bird" },
      { "value": "fish", "label": "Fish" },
      { "value": "reptile", "label": "Reptile" },
      { "value": "rabbit", "label": "Rabbit" },
      { "value": "hamster", "label": "Hamster" },
      { "value": "other", "label": "Other Pet" },
      { "value": "no_pets", "label": "No Pets" },
      { "value": "allergic", "label": "Allergic to Pets" },
      { "value": "want_pet", "label": "Want a Pet" }
    ],
    "communicationStyles": [
      { "value": "texter", "label": "Big Texter" },
      { "value": "phone_calls", "label": "Phone Calls" },
      { "value": "video_chats", "label": "Video Chats" },
      { "value": "in_person", "label": "Better in Person" }
    ],
    "loveLanguages": [
      { "value": "words_of_affirmation", "label": "Words of Affirmation" },
      { "value": "quality_time", "label": "Quality Time" },
      { "value": "physical_touch", "label": "Physical Touch" },
      { "value": "acts_of_service", "label": "Acts of Service" },
      { "value": "receiving_gifts", "label": "Receiving Gifts" }
    ],
    "sleepingHabits": [
      { "value": "early_bird", "label": "Early Bird" },
      { "value": "night_owl", "label": "Night Owl" },
      { "value": "flexible", "label": "Flexible" }
    ],
    "hobbies": ["...90+ hobbies with categories..."],
    "languages": ["...35+ languages..."],
    "heightRange": { "min": 100, "max": 250, "unit": "cm" },
    "ageRange": { "min": 18, "max": 100 },
    "distanceRange": { "min": 1, "max": 500, "unit": "km" }
  }
}
```

---

### Get Available Config Keys

Get list of all available configuration keys.

**Endpoint:** `GET /config/keys`

**cURL:**
```bash
curl -X GET http://localhost:5000/api/v1/config/keys
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Available configuration keys retrieved successfully",
  "data": {
    "keys": [
      "genders",
      "interestedIn",
      "datingIntentions",
      "relationshipTypes",
      "religions",
      "familyPlans",
      "educationLevels",
      "drinkingHabits",
      "smokingHabits",
      "marijuanaUsage",
      "drugsUsage",
      "workoutHabits",
      "dietPreferences",
      "politicalViews",
      "zodiacSigns",
      "pets",
      "languages",
      "hobbies",
      "communicationStyles",
      "loveLanguages",
      "sleepingHabits",
      "socialMediaUsage",
      "heightRange",
      "ageRange",
      "distanceRange",
      "reportReasons",
      "verificationTypes"
    ]
  }
}
```

---

### Get Onboarding Options

Get essential options for user registration/onboarding screens.

**Endpoint:** `GET /config/onboarding`

**cURL:**
```bash
curl -X GET http://localhost:5000/api/v1/config/onboarding
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Onboarding options retrieved successfully",
  "data": {
    "genders": [
      { "value": "male", "label": "Male" },
      { "value": "female", "label": "Female" },
      { "value": "non-binary", "label": "Non-Binary" },
      { "value": "transgender", "label": "Transgender" },
      { "value": "other", "label": "Other" },
      { "value": "prefer_not_to_say", "label": "Prefer Not to Say" }
    ],
    "interestedIn": [
      { "value": "male", "label": "Men" },
      { "value": "female", "label": "Women" },
      { "value": "non-binary", "label": "Non-Binary" },
      { "value": "everyone", "label": "Everyone" }
    ],
    "datingIntentions": [
      { "value": "long_term", "label": "Long-term Relationship" },
      { "value": "long_term_open_to_short", "label": "Long-term, Open to Short" },
      { "value": "short_term", "label": "Short-term Relationship" },
      { "value": "short_term_open_to_long", "label": "Short-term, Open to Long" },
      { "value": "casual", "label": "Casual Dating" },
      { "value": "new_friends", "label": "New Friends" },
      { "value": "still_figuring_out", "label": "Still Figuring It Out" }
    ],
    "heightRange": { "min": 100, "max": 250, "unit": "cm" },
    "ageRange": { "min": 18, "max": 100 }
  }
}
```

---

### Get Profile Options

Get options for profile completion (religion, education, etc.).

**Endpoint:** `GET /config/profile`

**cURL:**
```bash
curl -X GET http://localhost:5000/api/v1/config/profile
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Profile options retrieved successfully",
  "data": {
    "religions": [
      { "value": "agnostic", "label": "Agnostic" },
      { "value": "atheist", "label": "Atheist" },
      { "value": "buddhist", "label": "Buddhist" },
      { "value": "catholic", "label": "Catholic" },
      { "value": "christian", "label": "Christian" },
      { "value": "hindu", "label": "Hindu" },
      { "value": "jewish", "label": "Jewish" },
      { "value": "muslim", "label": "Muslim" },
      { "value": "sikh", "label": "Sikh" },
      { "value": "spiritual", "label": "Spiritual" },
      { "value": "other", "label": "Other" },
      { "value": "prefer_not_to_say", "label": "Prefer Not to Say" }
    ],
    "familyPlans": [
      { "value": "want_children", "label": "Want Children" },
      { "value": "dont_want_children", "label": "Don't Want Children" },
      { "value": "have_children_want_more", "label": "Have Children, Want More" },
      { "value": "have_children_dont_want_more", "label": "Have Children, Don't Want More" },
      { "value": "not_sure", "label": "Not Sure Yet" },
      { "value": "prefer_not_to_say", "label": "Prefer Not to Say" }
    ],
    "educationLevels": [
      { "value": "high_school", "label": "High School" },
      { "value": "some_college", "label": "Some College" },
      { "value": "associate", "label": "Associate Degree" },
      { "value": "bachelors", "label": "Bachelor's Degree" },
      { "value": "masters", "label": "Master's Degree" },
      { "value": "doctorate", "label": "Doctorate" },
      { "value": "professional", "label": "Professional Degree" },
      { "value": "trade_school", "label": "Trade/Vocational School" },
      { "value": "prefer_not_to_say", "label": "Prefer Not to Say" }
    ],
    "politicalViews": [
      { "value": "liberal", "label": "Liberal" },
      { "value": "moderate", "label": "Moderate" },
      { "value": "conservative", "label": "Conservative" },
      { "value": "not_political", "label": "Not Political" },
      { "value": "other", "label": "Other" },
      { "value": "prefer_not_to_say", "label": "Prefer Not to Say" }
    ],
    "zodiacSigns": [
      { "value": "aries", "label": "Aries", "dateRange": "Mar 21 - Apr 19" },
      { "value": "taurus", "label": "Taurus", "dateRange": "Apr 20 - May 20" },
      { "value": "gemini", "label": "Gemini", "dateRange": "May 21 - Jun 20" },
      { "value": "cancer", "label": "Cancer", "dateRange": "Jun 21 - Jul 22" },
      { "value": "leo", "label": "Leo", "dateRange": "Jul 23 - Aug 22" },
      { "value": "virgo", "label": "Virgo", "dateRange": "Aug 23 - Sep 22" },
      { "value": "libra", "label": "Libra", "dateRange": "Sep 23 - Oct 22" },
      { "value": "scorpio", "label": "Scorpio", "dateRange": "Oct 23 - Nov 21" },
      { "value": "sagittarius", "label": "Sagittarius", "dateRange": "Nov 22 - Dec 21" },
      { "value": "capricorn", "label": "Capricorn", "dateRange": "Dec 22 - Jan 19" },
      { "value": "aquarius", "label": "Aquarius", "dateRange": "Jan 20 - Feb 18" },
      { "value": "pisces", "label": "Pisces", "dateRange": "Feb 19 - Mar 20" }
    ],
    "languages": [
      { "value": "english", "label": "English" },
      { "value": "spanish", "label": "Spanish" },
      { "value": "french", "label": "French" },
      { "value": "german", "label": "German" },
      { "value": "hindi", "label": "Hindi" },
      { "value": "chinese", "label": "Chinese" },
      { "value": "japanese", "label": "Japanese" },
      { "value": "korean", "label": "Korean" },
      { "value": "arabic", "label": "Arabic" },
      "...and more"
    ],
    "pets": [
      { "value": "dog", "label": "Dog" },
      { "value": "cat", "label": "Cat" },
      { "value": "bird", "label": "Bird" },
      { "value": "fish", "label": "Fish" },
      { "value": "reptile", "label": "Reptile" },
      { "value": "rabbit", "label": "Rabbit" },
      { "value": "hamster", "label": "Hamster" },
      { "value": "other", "label": "Other Pet" },
      { "value": "no_pets", "label": "No Pets" },
      { "value": "allergic", "label": "Allergic to Pets" },
      { "value": "want_pet", "label": "Want a Pet" }
    ],
    "communicationStyles": [
      { "value": "texter", "label": "Big Texter" },
      { "value": "phone_calls", "label": "Phone Calls" },
      { "value": "video_chats", "label": "Video Chats" },
      { "value": "in_person", "label": "Better in Person" }
    ],
    "loveLanguages": [
      { "value": "words_of_affirmation", "label": "Words of Affirmation" },
      { "value": "quality_time", "label": "Quality Time" },
      { "value": "physical_touch", "label": "Physical Touch" },
      { "value": "acts_of_service", "label": "Acts of Service" },
      { "value": "receiving_gifts", "label": "Receiving Gifts" }
    ]
  }
}
```

---

### Get Lifestyle Options

Get lifestyle-related options (drinking, smoking, workout habits, etc.).

**Endpoint:** `GET /config/lifestyle`

**cURL:**
```bash
curl -X GET http://localhost:5000/api/v1/config/lifestyle
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Lifestyle options retrieved successfully",
  "data": {
    "drinkingHabits": [
      { "value": "never", "label": "Never" },
      { "value": "rarely", "label": "Rarely" },
      { "value": "socially", "label": "Socially" },
      { "value": "regularly", "label": "Regularly" },
      { "value": "prefer_not_to_say", "label": "Prefer Not to Say" }
    ],
    "smokingHabits": [
      { "value": "never", "label": "Never" },
      { "value": "occasionally", "label": "Occasionally" },
      { "value": "regularly", "label": "Regularly" },
      { "value": "trying_to_quit", "label": "Trying to Quit" },
      { "value": "prefer_not_to_say", "label": "Prefer Not to Say" }
    ],
    "marijuanaUsage": [
      { "value": "never", "label": "Never" },
      { "value": "occasionally", "label": "Occasionally" },
      { "value": "frequently", "label": "Frequently" },
      { "value": "prefer_not_to_say", "label": "Prefer Not to Say" }
    ],
    "drugsUsage": [
      { "value": "never", "label": "Never" },
      { "value": "occasionally", "label": "Occasionally" },
      { "value": "prefer_not_to_say", "label": "Prefer Not to Say" }
    ],
    "workoutHabits": [
      { "value": "never", "label": "Never" },
      { "value": "rarely", "label": "Rarely" },
      { "value": "sometimes", "label": "Sometimes" },
      { "value": "often", "label": "Often" },
      { "value": "daily", "label": "Daily" }
    ],
    "dietPreferences": [
      { "value": "omnivore", "label": "Omnivore" },
      { "value": "vegetarian", "label": "Vegetarian" },
      { "value": "vegan", "label": "Vegan" },
      { "value": "pescatarian", "label": "Pescatarian" },
      { "value": "keto", "label": "Keto" },
      { "value": "halal", "label": "Halal" },
      { "value": "kosher", "label": "Kosher" },
      { "value": "gluten_free", "label": "Gluten-Free" },
      { "value": "other", "label": "Other" }
    ],
    "sleepingHabits": [
      { "value": "early_bird", "label": "Early Bird" },
      { "value": "night_owl", "label": "Night Owl" },
      { "value": "flexible", "label": "Flexible" }
    ],
    "socialMediaUsage": [
      { "value": "very_active", "label": "Very Active" },
      { "value": "moderate", "label": "Moderate" },
      { "value": "rarely", "label": "Rarely" },
      { "value": "not_on_social_media", "label": "Not on Social Media" }
    ]
  }
}
```

---

### Get Relationship Options

Get relationship-related options (dating intentions, relationship types, etc.).

**Endpoint:** `GET /config/relationship`

**cURL:**
```bash
curl -X GET http://localhost:5000/api/v1/config/relationship
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Relationship options retrieved successfully",
  "data": {
    "datingIntentions": [
      { "value": "long_term", "label": "Long-term Relationship" },
      { "value": "long_term_open_to_short", "label": "Long-term, Open to Short" },
      { "value": "short_term", "label": "Short-term Relationship" },
      { "value": "short_term_open_to_long", "label": "Short-term, Open to Long" },
      { "value": "casual", "label": "Casual Dating" },
      { "value": "new_friends", "label": "New Friends" },
      { "value": "still_figuring_out", "label": "Still Figuring It Out" }
    ],
    "relationshipTypes": [
      { "value": "monogamy", "label": "Monogamy" },
      { "value": "non_monogamy", "label": "Non-Monogamy" },
      { "value": "polyamory", "label": "Polyamory" },
      { "value": "open_relationship", "label": "Open Relationship" },
      { "value": "open_to_exploring", "label": "Open to Exploring" }
    ],
    "familyPlans": [
      { "value": "want_children", "label": "Want Children" },
      { "value": "dont_want_children", "label": "Don't Want Children" },
      { "value": "have_children_want_more", "label": "Have Children, Want More" },
      { "value": "have_children_dont_want_more", "label": "Have Children, Don't Want More" },
      { "value": "not_sure", "label": "Not Sure Yet" },
      { "value": "prefer_not_to_say", "label": "Prefer Not to Say" }
    ],
    "loveLanguages": [
      { "value": "words_of_affirmation", "label": "Words of Affirmation" },
      { "value": "quality_time", "label": "Quality Time" },
      { "value": "physical_touch", "label": "Physical Touch" },
      { "value": "acts_of_service", "label": "Acts of Service" },
      { "value": "receiving_gifts", "label": "Receiving Gifts" }
    ]
  }
}
```

---

### Get Hobbies by Category

Get all hobbies grouped by category.

**Endpoint:** `GET /config/hobbies/categories`

**cURL:**
```bash
curl -X GET http://localhost:5000/api/v1/config/hobbies/categories
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Hobbies by category retrieved successfully",
  "data": {
    "hobbies": {
      "Sports & Fitness": [
        { "value": "gym", "label": "Gym" },
        { "value": "yoga", "label": "Yoga" },
        { "value": "running", "label": "Running" },
        { "value": "swimming", "label": "Swimming" },
        { "value": "cycling", "label": "Cycling" },
        { "value": "hiking", "label": "Hiking" },
        { "value": "football", "label": "Football" },
        { "value": "basketball", "label": "Basketball" },
        { "value": "tennis", "label": "Tennis" },
        { "value": "martial_arts", "label": "Martial Arts" },
        { "value": "dancing", "label": "Dancing" },
        { "value": "rock_climbing", "label": "Rock Climbing" },
        { "value": "skiing", "label": "Skiing" },
        { "value": "surfing", "label": "Surfing" }
      ],
      "Music & Arts": [
        { "value": "music", "label": "Music" },
        { "value": "singing", "label": "Singing" },
        { "value": "playing_guitar", "label": "Playing Guitar" },
        { "value": "playing_piano", "label": "Playing Piano" },
        { "value": "djing", "label": "DJing" },
        { "value": "painting", "label": "Painting" },
        { "value": "drawing", "label": "Drawing" },
        { "value": "photography", "label": "Photography" },
        { "value": "filmmaking", "label": "Filmmaking" },
        { "value": "writing", "label": "Writing" },
        { "value": "pottery", "label": "Pottery" }
      ],
      "Entertainment": [
        { "value": "movies", "label": "Movies" },
        { "value": "tv_shows", "label": "TV Shows" },
        { "value": "anime", "label": "Anime" },
        { "value": "concerts", "label": "Concerts" },
        { "value": "theater", "label": "Theater" },
        { "value": "comedy", "label": "Comedy" },
        { "value": "podcasts", "label": "Podcasts" },
        { "value": "gaming", "label": "Gaming" },
        { "value": "board_games", "label": "Board Games" },
        { "value": "karaoke", "label": "Karaoke" }
      ],
      "Food & Drink": [
        { "value": "cooking", "label": "Cooking" },
        { "value": "baking", "label": "Baking" },
        { "value": "wine_tasting", "label": "Wine Tasting" },
        { "value": "craft_beer", "label": "Craft Beer" },
        { "value": "coffee", "label": "Coffee" },
        { "value": "foodie", "label": "Foodie" },
        { "value": "brunch", "label": "Brunch" },
        { "value": "bbq", "label": "BBQ" }
      ],
      "Travel & Adventure": [
        { "value": "traveling", "label": "Traveling" },
        { "value": "road_trips", "label": "Road Trips" },
        { "value": "camping", "label": "Camping" },
        { "value": "backpacking", "label": "Backpacking" },
        { "value": "beach", "label": "Beach" },
        { "value": "mountains", "label": "Mountains" },
        { "value": "adventure_sports", "label": "Adventure Sports" },
        { "value": "scuba_diving", "label": "Scuba Diving" }
      ],
      "Lifestyle": [
        { "value": "reading", "label": "Reading" },
        { "value": "gardening", "label": "Gardening" },
        { "value": "meditation", "label": "Meditation" },
        { "value": "volunteering", "label": "Volunteering" },
        { "value": "fashion", "label": "Fashion" },
        { "value": "shopping", "label": "Shopping" },
        { "value": "spa", "label": "Spa & Wellness" },
        { "value": "astrology", "label": "Astrology" }
      ],
      "Social": [
        { "value": "partying", "label": "Partying" },
        { "value": "nightlife", "label": "Nightlife" },
        { "value": "networking", "label": "Networking" },
        { "value": "social_activism", "label": "Social Activism" }
      ],
      "Technology": [
        { "value": "technology", "label": "Technology" },
        { "value": "programming", "label": "Programming" },
        { "value": "startups", "label": "Startups" },
        { "value": "crypto", "label": "Crypto" },
        { "value": "ai", "label": "AI & Machine Learning" }
      ],
      "Pets & Animals": [
        { "value": "dogs", "label": "Dogs" },
        { "value": "cats", "label": "Cats" },
        { "value": "animals", "label": "Animals" },
        { "value": "horse_riding", "label": "Horse Riding" }
      ]
    }
  }
}
```

---

### Search Hobbies

Search hobbies by name or category.

**Endpoint:** `GET /config/hobbies/search`

**Query Parameters:**
- `q` (required): Search query

**cURL:**
```bash
curl -X GET "http://localhost:5000/api/v1/config/hobbies/search?q=music"
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Hobbies search results retrieved successfully",
  "data": {
    "hobbies": [
      { "value": "music", "label": "Music", "category": "Music & Arts" },
      { "value": "singing", "label": "Singing", "category": "Music & Arts" },
      { "value": "playing_guitar", "label": "Playing Guitar", "category": "Music & Arts" },
      { "value": "playing_piano", "label": "Playing Piano", "category": "Music & Arts" },
      { "value": "djing", "label": "DJing", "category": "Music & Arts" }
    ],
    "count": 5
  }
}
```

---

### Get Multiple Configs (Batch)

Fetch multiple configuration options in a single request.

**Endpoint:** `POST /config/batch`

**cURL:**
```bash
curl -X POST http://localhost:5000/api/v1/config/batch \
  -H "Content-Type: application/json" \
  -d '{
    "keys": ["genders", "datingIntentions", "religions", "drinkingHabits"]
  }'
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Configuration options retrieved successfully",
  "data": {
    "genders": [...],
    "datingIntentions": [...],
    "religions": [...],
    "drinkingHabits": [...]
  }
}
```

---

### Get Specific Config by Key

Get a specific configuration option by its key.

**Endpoint:** `GET /config/:key`

**cURL:**
```bash
curl -X GET http://localhost:5000/api/v1/config/datingIntentions
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Configuration for 'datingIntentions' retrieved successfully",
  "data": {
    "datingIntentions": [
      { "value": "long_term", "label": "Long-term Relationship" },
      { "value": "long_term_open_to_short", "label": "Long-term, Open to Short" },
      { "value": "short_term", "label": "Short-term Relationship" },
      { "value": "short_term_open_to_long", "label": "Short-term, Open to Long" },
      { "value": "casual", "label": "Casual Dating" },
      { "value": "new_friends", "label": "New Friends" },
      { "value": "still_figuring_out", "label": "Still Figuring It Out" }
    ]
  }
}
```

**Error Response (404):**
```json
{
  "success": true,
  "statusCode": 404,
  "message": "Configuration key 'invalidKey' not found",
  "data": null
}
```

---

## Authentication

### Register

Create a new user account.

**Endpoint:** `POST /auth/register`

**cURL:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "SecurePass123!",
    "phoneNumber": "+1234567890",
    "dateOfBirth": "1995-05-15",
    "gender": "male",
    "interestedIn": ["female"],
    "agreedToTerms": true,
    "agreedToPrivacyPolicy": true
  }'
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phoneNumber": "+1234567890",
      "dateOfBirth": "1995-05-15T00:00:00.000Z",
      "gender": "male",
      "interestedIn": ["female"],
      "isVerified": false,
      "isActive": true,
      "isPremium": false,
      "photos": [],
      "interests": [],
      "preferences": {
        "ageRange": { "min": 18, "max": 80 },
        "maxDistance": 50,
        "showMe": "everyone"
      },
      "privacySettings": {
        "showAge": true,
        "showDistance": true,
        "showOnlineStatus": true,
        "incognitoMode": false
      },
      "stats": {
        "totalSwipes": 0,
        "totalMatches": 0,
        "profileViews": 0
      },
      "createdAt": "2026-01-12T10:30:00.000Z",
      "updatedAt": "2026-01-12T10:30:00.000Z",
      "age": 30
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
}
```

**Error Response (409 - Email Exists):**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

**Error Response (400 - Underage):**
```json
{
  "success": false,
  "message": "You must be at least 18 years old to register"
}
```

---

### Login

Authenticate and receive access tokens.

**Endpoint:** `POST /auth/login`

**cURL:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePass123!"
  }'
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "...": "..."
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### Refresh Token

Get a new access token using refresh token.

**Endpoint:** `POST /auth/refresh-token`

**cURL:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/refresh-token \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
}
```

---

### Logout

Invalidate current session.

**Endpoint:** `POST /auth/logout`

**cURL:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/logout \
  -H "Authorization: Bearer <access_token>"
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### Get Current User

Get authenticated user's profile.

**Endpoint:** `GET /auth/me`

**cURL:**
```bash
curl -X GET http://localhost:5000/api/v1/auth/me \
  -H "Authorization: Bearer <access_token>"
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "User profile retrieved",
  "data": {
    "user": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phoneNumber": "+1234567890",
      "dateOfBirth": "1995-05-15T00:00:00.000Z",
      "gender": "male",
      "interestedIn": ["female"],
      "bio": "Software engineer who loves hiking...",
      "occupation": "Software Engineer",
      "education": "MIT",
      "educationLevel": "masters",
      "height": 180,
      "datingIntention": "long_term",
      "relationshipType": "monogamy",
      "religion": "spiritual",
      "politicalViews": "moderate",
      "familyPlans": "want_children",
      "drinkingHabit": "socially",
      "smokingHabit": "never",
      "workoutHabit": "often",
      "dietPreference": "omnivore",
      "sleepingHabit": "night_owl",
      "zodiacSign": "taurus",
      "communicationStyle": "texter",
      "loveLanguage": "quality_time",
      "pets": ["dog"],
      "languages": ["english", "spanish"],
      "interests": ["hiking", "photography", "cooking"],
      "location": {
        "type": "Point",
        "coordinates": [-73.935242, 40.730610],
        "city": "New York",
        "country": "United States"
      },
      "photos": [
        {
          "_id": "photo1id",
          "url": "https://res.cloudinary.com/...",
          "isPrimary": true
        }
      ],
      "preferences": {
        "ageRange": { "min": 25, "max": 35 },
        "maxDistance": 30,
        "showMe": "female"
      },
      "isVerified": false,
      "isActive": true,
      "isPremium": false,
      "age": 30,
      "primaryPhoto": {
        "_id": "photo1id",
        "url": "https://res.cloudinary.com/..."
      }
    }
  }
}
```

---

### Forgot Password

Request password reset email.

**Endpoint:** `POST /auth/forgot-password`

**cURL:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com"
  }'
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

---

### Reset Password

Reset password using token from email.

**Endpoint:** `POST /auth/reset-password/:token`

**cURL:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/reset-password/abc123token \
  -H "Content-Type: application/json" \
  -d '{
    "password": "NewSecurePass123!"
  }'
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

---

### Change Password

Change password (requires authentication).

**Endpoint:** `PUT /auth/change-password`

**cURL:**
```bash
curl -X PUT http://localhost:5000/api/v1/auth/change-password \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "currentPassword": "SecurePass123!",
    "newPassword": "NewSecurePass123!"
  }'
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

### Delete Account

Permanently delete user account.

**Endpoint:** `DELETE /auth/delete-account`

**cURL:**
```bash
curl -X DELETE http://localhost:5000/api/v1/auth/delete-account \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "password": "SecurePass123!"
  }'
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Account deleted successfully"
}
```

---

## User Onboarding

Complete user onboarding flow after registration.

### Onboarding Flow Summary

| Step | API | Method | Auth |
|------|-----|--------|------|
| 1 | `/config/onboarding` | GET | ❌ |
| 2 | `/config/profile` | GET | ❌ |
| 3 | `/config/lifestyle` | GET | ❌ |
| 4 | `/config/hobbies/categories` | GET | ❌ |
| 5 | `/auth/register` | POST | ❌ |
| 6 | `/users/profile` | PUT | ✅ |
| 7 | `/users/photos` | POST | ✅ |
| 8 | `/users/location` | PUT | ✅ |
| 9 | `/users/preferences` | PUT | ✅ |

---

## User Management

### Get User Profile

Get any user's public profile.

**Endpoint:** `GET /users/:id`

**cURL:**
```bash
curl -X GET http://localhost:5000/api/v1/users/65a1b2c3d4e5f6g7h8i9j0k1 \
  -H "Authorization: Bearer <access_token>"
```

**Response:** `200 OK`

---

### Update Profile

Update authenticated user's profile with all lifestyle and onboarding data.

**Endpoint:** `PUT /users/profile`

**cURL:**
```bash
curl -X PUT http://localhost:5000/api/v1/users/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "bio": "Software engineer who loves hiking and photography. Looking for someone to explore the world with! ☕️🏔️",
    "occupation": "Software Engineer",
    "education": "MIT",
    "educationLevel": "masters",
    "height": 180,
    "datingIntention": "long_term",
    "relationshipType": "monogamy",
    "religion": "spiritual",
    "politicalViews": "moderate",
    "familyPlans": "want_children",
    "drinkingHabit": "socially",
    "smokingHabit": "never",
    "marijuanaUsage": "never",
    "workoutHabit": "often",
    "dietPreference": "omnivore",
    "sleepingHabit": "night_owl",
    "zodiacSign": "taurus",
    "communicationStyle": "texter",
    "loveLanguage": "quality_time",
    "pets": ["dog"],
    "languages": ["english", "spanish"],
    "socialMediaUsage": "moderate",
    "interests": ["hiking", "photography", "cooking", "traveling", "coffee", "gym", "movies"]
  }'
```

**Allowed Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `firstName` | String | First name |
| `lastName` | String | Last name |
| `phoneNumber` | String | Phone number |
| `bio` | String | Bio (max 500 chars) |
| `occupation` | String | Job title |
| `education` | String | School/University name |
| `educationLevel` | String | Education level (from config) |
| `height` | Number | Height in cm (100-250) |
| `interests` | Array | Array of hobby values |
| `datingIntention` | String | Dating intention (from config) |
| `relationshipType` | String | Relationship type (from config) |
| `religion` | String | Religion (from config) |
| `politicalViews` | String | Political views (from config) |
| `familyPlans` | String | Family plans (from config) |
| `drinkingHabit` | String | Drinking habit (from config) |
| `smokingHabit` | String | Smoking habit (from config) |
| `marijuanaUsage` | String | Marijuana usage (from config) |
| `workoutHabit` | String | Workout habit (from config) |
| `dietPreference` | String | Diet preference (from config) |
| `sleepingHabit` | String | Sleeping habit (from config) |
| `zodiacSign` | String | Zodiac sign (from config) |
| `communicationStyle` | String | Communication style (from config) |
| `loveLanguage` | String | Love language (from config) |
| `pets` | Array | Array of pet values |
| `languages` | Array | Array of language values |
| `socialMediaUsage` | String | Social media usage (from config) |

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "bio": "Software engineer who loves hiking and photography...",
      "occupation": "Software Engineer",
      "education": "MIT",
      "educationLevel": "masters",
      "height": 180,
      "datingIntention": "long_term",
      "relationshipType": "monogamy",
      "religion": "spiritual",
      "politicalViews": "moderate",
      "familyPlans": "want_children",
      "drinkingHabit": "socially",
      "smokingHabit": "never",
      "marijuanaUsage": "never",
      "workoutHabit": "often",
      "dietPreference": "omnivore",
      "sleepingHabit": "night_owl",
      "zodiacSign": "taurus",
      "communicationStyle": "texter",
      "loveLanguage": "quality_time",
      "pets": ["dog"],
      "languages": ["english", "spanish"],
      "socialMediaUsage": "moderate",
      "interests": ["hiking", "photography", "cooking", "traveling", "coffee", "gym", "movies"],
      "updatedAt": "2026-01-12T10:35:00.000Z"
    }
  }
}
```

---

### Update Preferences

Update matching preferences.

**Endpoint:** `PUT /users/preferences`

**cURL:**
```bash
curl -X PUT http://localhost:5000/api/v1/users/preferences \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "ageRange": {
      "min": 25,
      "max": 35
    },
    "maxDistance": 30,
    "showMe": "female"
  }'
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Preferences updated successfully",
  "data": {
    "user": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "preferences": {
        "ageRange": { "min": 25, "max": 35 },
        "maxDistance": 30,
        "showMe": "female"
      }
    }
  }
}
```

---

### Update Privacy Settings

Update privacy preferences.

**Endpoint:** `PUT /users/privacy`

**cURL:**
```bash
curl -X PUT http://localhost:5000/api/v1/users/privacy \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "showAge": true,
    "showDistance": true,
    "showOnlineStatus": false,
    "incognitoMode": false
  }'
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Privacy settings updated successfully",
  "data": {
    "user": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "privacySettings": {
        "showAge": true,
        "showDistance": true,
        "showOnlineStatus": false,
        "incognitoMode": false
      }
    }
  }
}
```

---

### Upload Photos

Upload profile photos (max 6).

**Endpoint:** `POST /users/photos`

**cURL:**
```bash
curl -X POST http://localhost:5000/api/v1/users/photos \
  -H "Authorization: Bearer <access_token>" \
  -F "photos=@/path/to/photo1.jpg" \
  -F "photos=@/path/to/photo2.jpg" \
  -F "photos=@/path/to/photo3.jpg"
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Photos uploaded successfully",
  "data": {
    "photos": [
      {
        "_id": "photo1id",
        "url": "https://res.cloudinary.com/dating-app/image/upload/v1234567890/users/65a1b2c3d4e5f6g7h8i9j0k1/photo1.jpg",
        "publicId": "dating-app/users/65a1b2c3d4e5f6g7h8i9j0k1/photo1",
        "isPrimary": true,
        "uploadedAt": "2026-01-12T10:40:00.000Z"
      },
      {
        "_id": "photo2id",
        "url": "https://res.cloudinary.com/dating-app/image/upload/v1234567890/users/65a1b2c3d4e5f6g7h8i9j0k1/photo2.jpg",
        "publicId": "dating-app/users/65a1b2c3d4e5f6g7h8i9j0k1/photo2",
        "isPrimary": false,
        "uploadedAt": "2026-01-12T10:40:00.000Z"
      },
      {
        "_id": "photo3id",
        "url": "https://res.cloudinary.com/dating-app/image/upload/v1234567890/users/65a1b2c3d4e5f6g7h8i9j0k1/photo3.jpg",
        "publicId": "dating-app/users/65a1b2c3d4e5f6g7h8i9j0k1/photo3",
        "isPrimary": false,
        "uploadedAt": "2026-01-12T10:40:00.000Z"
      }
    ]
  }
}
```

**Error Response (400 - Max Photos):**
```json
{
  "success": false,
  "message": "Maximum 6 photos allowed"
}
```

---

### Delete Photo

Delete a profile photo.

**Endpoint:** `DELETE /users/photos/:photoId`

**cURL:**
```bash
curl -X DELETE http://localhost:5000/api/v1/users/photos/photo1id \
  -H "Authorization: Bearer <access_token>"
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Photo deleted successfully"
}
```

---

### Set Primary Photo

Set a photo as primary.

**Endpoint:** `PUT /users/photos/:photoId/primary`

**cURL:**
```bash
curl -X PUT http://localhost:5000/api/v1/users/photos/photo2id/primary \
  -H "Authorization: Bearer <access_token>"
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Primary photo updated successfully",
  "data": {
    "photos": [...]
  }
}
```

---

### Update Location

Update user's location.

**Endpoint:** `PUT /users/location`

**cURL:**
```bash
curl -X PUT http://localhost:5000/api/v1/users/location \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "longitude": -73.935242,
    "latitude": 40.730610,
    "city": "New York",
    "country": "United States"
  }'
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Location updated successfully",
  "data": {
    "location": {
      "type": "Point",
      "coordinates": [-73.935242, 40.730610],
      "city": "New York",
      "country": "United States"
    }
  }
}
```

---

### Block User

Block a user.

**Endpoint:** `POST /users/block/:userId`

**cURL:**
```bash
curl -X POST http://localhost:5000/api/v1/users/block/65a1b2c3d4e5f6g7h8i9j0k2 \
  -H "Authorization: Bearer <access_token>"
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "User blocked successfully"
}
```

---

### Unblock User

Unblock a user.

**Endpoint:** `DELETE /users/block/:userId`

**cURL:**
```bash
curl -X DELETE http://localhost:5000/api/v1/users/block/65a1b2c3d4e5f6g7h8i9j0k2 \
  -H "Authorization: Bearer <access_token>"
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "User unblocked successfully"
}
```

---

### Get Blocked Users

Get list of blocked users.

**Endpoint:** `GET /users/blocked`

**cURL:**
```bash
curl -X GET http://localhost:5000/api/v1/users/blocked \
  -H "Authorization: Bearer <access_token>"
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Blocked users retrieved",
  "data": {
    "blockedUsers": [
      {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
        "firstName": "Jane",
        "lastName": "Smith",
        "photos": [...]
      }
    ]
  }
}
```

---

## Swipe System

### Get Discover Users

Get potential matches for swiping.

**Endpoint:** `GET /swipes/discover`

**Query Parameters:**
- `limit` (optional): Number of users to return (default: 20)

**cURL:**
```bash
curl -X GET "http://localhost:5000/api/v1/swipes/discover?limit=20" \
  -H "Authorization: Bearer <access_token>"
```

**Response:** `200 OK`

---

### Swipe on User

Perform a swipe action.

**Endpoint:** `POST /swipes`

**cURL:**
```bash
curl -X POST http://localhost:5000/api/v1/swipes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "swipedUserId": "65a1b2c3d4e5f6g7h8i9j0k2",
    "action": "like"
  }'
```

**Actions:** `like`, `dislike`, `superlike`

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "It's a match!",
  "data": {
    "swipe": { ... },
    "isMatch": true,
    "match": { ... }
  }
}
```

---

### Get Swipe History

Get user's swipe history.

**Endpoint:** `GET /swipes/history`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `action` (optional): Filter by action type

**cURL:**
```bash
curl -X GET "http://localhost:5000/api/v1/swipes/history?page=1&limit=20&action=like" \
  -H "Authorization: Bearer <access_token>"
```

**Response:** `200 OK` (paginated)

---

### Get Users Who Liked Me

Get list of users who liked you.

**Endpoint:** `GET /swipes/likes`

**cURL:**
```bash
curl -X GET http://localhost:5000/api/v1/swipes/likes \
  -H "Authorization: Bearer <access_token>"
```

**Response:** `200 OK`

---

### Undo Last Swipe

Undo the last swipe (Premium feature).

**Endpoint:** `POST /swipes/undo`

**cURL:**
```bash
curl -X POST http://localhost:5000/api/v1/swipes/undo \
  -H "Authorization: Bearer <access_token>"
```

**Response:** `200 OK`

---

## Match System

### Get Matches

Get user's matches.

**Endpoint:** `GET /matches`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `status` (optional): Filter by status (default: 'active')

**cURL:**
```bash
curl -X GET "http://localhost:5000/api/v1/matches?page=1&limit=20&status=active" \
  -H "Authorization: Bearer <access_token>"
```

**Response:** `200 OK` (paginated)

---

### Get Match Details

Get details of a specific match.

**Endpoint:** `GET /matches/:id`

**cURL:**
```bash
curl -X GET http://localhost:5000/api/v1/matches/65a1b2c3d4e5f6g7h8i9j0k1 \
  -H "Authorization: Bearer <access_token>"
```

**Response:** `200 OK`

---

### Unmatch

Remove a match.

**Endpoint:** `DELETE /matches/:id`

**cURL:**
```bash
curl -X DELETE http://localhost:5000/api/v1/matches/65a1b2c3d4e5f6g7h8i9j0k1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "reason": "Not interested anymore"
  }'
```

**Response:** `200 OK`

---

### Get Match Statistics

Get user's match statistics.

**Endpoint:** `GET /matches/stats`

**cURL:**
```bash
curl -X GET http://localhost:5000/api/v1/matches/stats \
  -H "Authorization: Bearer <access_token>"
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Match statistics retrieved",
  "data": {
    "stats": {
      "totalMatches": 25,
      "matchesWithConversation": 15,
      "matchesWithoutConversation": 10,
      "recentMatches": 5
    }
  }
}
```

---

## Filters & Search

### Search Users

Search users with advanced filters.

**Endpoint:** `GET /filters/search`

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `minAge` (optional): Minimum age
- `maxAge` (optional): Maximum age
- `gender` (optional): Gender filter
- `maxDistance` (optional): Maximum distance in km
- `minHeight` (optional): Minimum height in cm
- `maxHeight` (optional): Maximum height in cm
- `education` (optional): Education level
- `interests` (optional): Interests (array)
- `city` (optional): City name
- `country` (optional): Country name

**cURL:**
```bash
curl -X GET "http://localhost:5000/api/v1/filters/search?minAge=25&maxAge=35&gender=female&maxDistance=50&city=New%20York" \
  -H "Authorization: Bearer <access_token>"
```

**Response:** `200 OK` (paginated)

---

### Get Filter Options

Get available filter options.

**Endpoint:** `GET /filters/options`

**cURL:**
```bash
curl -X GET http://localhost:5000/api/v1/filters/options \
  -H "Authorization: Bearer <access_token>"
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Filter options retrieved",
  "data": {
    "options": {
      "genders": ["male", "female", "non-binary", "other"],
      "cities": ["New York", "San Francisco", "..."],
      "countries": ["USA", "Canada", "..."],
      "educationLevels": ["High School", "Bachelor's", "..."],
      "interests": ["hiking", "travel", "music", "..."],
      "ageRange": { "min": 18, "max": 100 },
      "heightRange": { "min": 100, "max": 250 },
      "distanceRange": { "min": 1, "max": 500 }
    }
  }
}
```

---

## Content Pages

### Get Terms and Conditions

**Endpoint:** `GET /content/terms`

**cURL:**
```bash
curl -X GET http://localhost:5000/api/v1/content/terms
```

**Response:** `200 OK`

---

### Get Privacy Policy

**Endpoint:** `GET /content/privacy`

**cURL:**
```bash
curl -X GET http://localhost:5000/api/v1/content/privacy
```

**Response:** `200 OK`

---

### Get Community Guidelines

**Endpoint:** `GET /content/guidelines`

**cURL:**
```bash
curl -X GET http://localhost:5000/api/v1/content/guidelines
```

**Response:** `200 OK`

---

## Error Handling

### HTTP Status Codes

| Code | Description |
|------|-------------|
| `200` | OK: Request successful |
| `201` | Created: Resource created successfully |
| `400` | Bad Request: Invalid input |
| `401` | Unauthorized: Authentication required |
| `403` | Forbidden: Access denied |
| `404` | Not Found: Resource not found |
| `409` | Conflict: Resource already exists |
| `429` | Too Many Requests: Rate limit exceeded |
| `500` | Internal Server Error: Server error |

### Common Error Responses

**Validation Error (400)**
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": ["Email is required", "Password must be at least 8 characters"]
}
```

**Authentication Error (401)**
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

**Not Found Error (404)**
```json
{
  "success": false,
  "message": "User not found"
}
```

**Rate Limit Error (429)**
```json
{
  "success": false,
  "message": "Too many requests, please try again later"
}
```

---

## Rate Limiting

### Rate Limits

| Endpoint Type | Limit |
|---------------|-------|
| General API | 100 requests per 15 minutes |
| Authentication | 5 requests per 15 minutes |
| Swipes | 100 swipes per hour (free users) |
| Messages | 20 messages per minute |

### Rate Limit Headers

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```

---

## Webhooks (Future Feature)

Coming soon: Real-time notifications for matches, messages, and more.

---

## SDK & Libraries

Coming soon: Official SDKs for popular languages and frameworks.

---

**Last Updated:** January 2026
