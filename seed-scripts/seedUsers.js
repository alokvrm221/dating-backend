require('dotenv').config();
const mongoose = require('mongoose');
const { User } = require('../src/models');

// Sample data
const firstNames = {
  male: ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Christopher'],
  female: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen'],
};

const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

const bios = [
  'Love hiking and outdoor adventures 🏔️',
  'Coffee enthusiast and bookworm ☕📚',
  'Fitness junkie and healthy living advocate 💪',
  'Travel addict exploring the world 🌍',
  'Foodie who loves trying new restaurants 🍕',
  'Music lover and concert goer 🎵',
  'Dog person looking for adventure buddy 🐕',
  'Beach bum and sunset chaser 🌅',
  'Yoga instructor and meditation practitioner 🧘',
  'Tech geek and startup enthusiast 💻',
  'Artist and creative soul 🎨',
  'Sports fan and weekend warrior ⚽',
  'Wine enthusiast and cheese lover 🍷',
  'Movie buff and Netflix binger 🎬',
  'Entrepreneur building dreams 🚀',
  'Nature lover and environmentalist 🌱',
  'Dancer and party enthusiast 💃',
  'Photographer capturing moments 📸',
  'Chef experimenting in the kitchen 👨‍🍳',
  'Gamer and anime fan 🎮',
];

const occupations = [
  'Software Engineer',
  'Marketing Manager',
  'Graphic Designer',
  'Teacher',
  'Nurse',
  'Sales Executive',
  'Financial Analyst',
  'Product Manager',
  'Entrepreneur',
  'Consultant',
  'Architect',
  'Photographer',
  'Writer',
  'Doctor',
  'Lawyer',
  'Chef',
  'Personal Trainer',
  'Real Estate Agent',
  'Data Scientist',
  'UX Designer',
];

const interests = [
  ['hiking', 'travel', 'photography'],
  ['coffee', 'books', 'movies'],
  ['fitness', 'yoga', 'healthy-eating'],
  ['travel', 'adventure', 'backpacking'],
  ['food', 'cooking', 'wine'],
  ['music', 'concerts', 'festivals'],
  ['dogs', 'pets', 'animals'],
  ['beach', 'surfing', 'swimming'],
  ['meditation', 'mindfulness', 'wellness'],
  ['technology', 'startups', 'innovation'],
  ['art', 'painting', 'creativity'],
  ['sports', 'soccer', 'basketball'],
  ['wine', 'cheese', 'fine-dining'],
  ['movies', 'netflix', 'tv-shows'],
  ['business', 'entrepreneurship', 'investing'],
  ['nature', 'camping', 'hiking'],
  ['dancing', 'parties', 'nightlife'],
  ['photography', 'videography', 'editing'],
  ['cooking', 'baking', 'recipes'],
  ['gaming', 'anime', 'comics'],
];

const cities = [
  { city: 'New York', country: 'USA', coordinates: [-74.006, 40.7128] },
  { city: 'Los Angeles', country: 'USA', coordinates: [-118.2437, 34.0522] },
  { city: 'Chicago', country: 'USA', coordinates: [-87.6298, 41.8781] },
  { city: 'San Francisco', country: 'USA', coordinates: [-122.4194, 37.7749] },
  { city: 'Miami', country: 'USA', coordinates: [-80.1918, 25.7617] },
  { city: 'Seattle', country: 'USA', coordinates: [-122.3321, 47.6062] },
  { city: 'Boston', country: 'USA', coordinates: [-71.0589, 42.3601] },
  { city: 'Austin', country: 'USA', coordinates: [-97.7431, 30.2672] },
  { city: 'Denver', country: 'USA', coordinates: [-104.9903, 39.7392] },
  { city: 'Portland', country: 'USA', coordinates: [-122.6765, 45.5152] },
];

// Generate random date of birth (between 22 and 40 years old)
function getRandomDateOfBirth() {
  const today = new Date();
  const minAge = 22;
  const maxAge = 40;
  const age = Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;
  const year = today.getFullYear() - age;
  const month = Math.floor(Math.random() * 12);
  const day = Math.floor(Math.random() * 28) + 1;
  return new Date(year, month, day);
}

// Generate random height (in cm)
function getRandomHeight(gender) {
  if (gender === 'male') {
    return Math.floor(Math.random() * (195 - 165 + 1)) + 165; // 165-195 cm
  } else {
    return Math.floor(Math.random() * (180 - 155 + 1)) + 155; // 155-180 cm
  }
}

// Generate users
async function generateUsers() {
  const users = [];

  for (let i = 0; i < 20; i++) {
    const gender = i % 2 === 0 ? 'male' : 'female';
    const firstName = firstNames[gender][i % 10];
    const lastName = lastNames[i % 10];
    const phoneNumber = `+1${String(1000000000 + i).padStart(10, '0')}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@test.com`;
    const location = cities[i % 10];

    const user = {
      firstName,
      lastName,
      phoneNumber,
      email,
      dateOfBirth: getRandomDateOfBirth(),
      gender,
      interestedIn: gender === 'male' ? ['female'] : ['male'],
      bio: bios[i],
      occupation: occupations[i],
      height: getRandomHeight(gender),
      interests: interests[i],
      location: {
        type: 'Point',
        coordinates: location.coordinates,
        city: location.city,
        country: location.country,
      },
      phoneVerified: true,
      phoneVerifiedAt: new Date(),
      agreedToTerms: true,
      agreedToPrivacyPolicy: true,
      termsAgreedAt: new Date(),
      isActive: true,
      preferences: {
        ageRange: {
          min: 22,
          max: 40,
        },
        maxDistance: 50,
        showMe: gender === 'male' ? 'female' : 'male',
      },
    };

    users.push(user);
  }

  return users;
}

// Main seed function
async function seedUsers() {
  try {
    console.log('🌱 Starting user seeding...');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dating-app');
    console.log('✅ Connected to MongoDB');

    // Clear existing test users (optional)
    const deleteResult = await User.deleteMany({
      email: { $regex: /@test\.com$/ },
    });
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing test users`);

    // Generate and insert users
    const users = await generateUsers();
    const insertedUsers = await User.insertMany(users);
    console.log(`✅ Successfully created ${insertedUsers.length} test users`);

    // Display summary
    console.log('\n📊 Summary:');
    console.log(`   - Male users: ${insertedUsers.filter((u) => u.gender === 'male').length}`);
    console.log(`   - Female users: ${insertedUsers.filter((u) => u.gender === 'female').length}`);
    console.log(`   - Cities: ${[...new Set(insertedUsers.map((u) => u.location.city))].join(', ')}`);

    console.log('\n🎉 Seeding completed successfully!');
    console.log('\n📝 Test user credentials:');
    console.log('   Phone: +11000000000 to +11000000019');
    console.log('   OTP: 123456 (master OTP)');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  }
}

// Run the seed function
seedUsers();

