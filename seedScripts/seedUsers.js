require('dotenv').config();
const mongoose = require('mongoose');
const { User } = require('../src/models');

// Sample data arrays
const firstNames = {
  male: ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles'],
  female: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen'],
};

const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

const bios = [
  'Love hiking, coffee, and good conversations. Looking for someone to share adventures with.',
  'Foodie, traveler, and dog lover. Let\'s explore the city together!',
  'Fitness enthusiast and yoga instructor. Living life to the fullest.',
  'Software engineer by day, musician by night. Looking for my duet partner.',
  'Adventure seeker and nature lover. Let\'s get lost in the mountains.',
  'Bookworm, coffee addict, and aspiring chef. Swipe right for good food!',
  'Gym rat, Netflix binger, and pizza enthusiast. Balance is key.',
  'Artist and creative soul. Looking for inspiration and connection.',
  'Entrepreneur building dreams. Let\'s create something amazing together.',
  'Teacher, traveler, and lifelong learner. Curious about everything.',
  'Photographer capturing life\'s moments. Let\'s make memories together.',
  'Nurse with a big heart. Looking for someone genuine and kind.',
  'Marketing professional who loves spontaneous road trips.',
  'Chef who believes the way to the heart is through the stomach.',
  'Architect designing my future. Want to be part of it?',
  'Personal trainer helping people achieve their goals.',
  'Writer crafting stories. Let\'s write our own chapter.',
  'Musician playing life by ear. Looking for harmony.',
  'Dancer moving through life with passion and grace.',
  'Engineer solving problems and building connections.',
];

const occupations = [
  'Software Engineer',
  'Marketing Manager',
  'Teacher',
  'Nurse',
  'Entrepreneur',
  'Graphic Designer',
  'Accountant',
  'Sales Manager',
  'Chef',
  'Photographer',
  'Fitness Trainer',
  'Doctor',
  'Lawyer',
  'Architect',
  'Writer',
  'Musician',
  'Real Estate Agent',
  'Consultant',
  'Engineer',
  'Artist',
];

const interests = [
  ['hiking', 'coffee', 'travel'],
  ['fitness', 'yoga', 'meditation'],
  ['music', 'concerts', 'festivals'],
  ['cooking', 'food', 'wine'],
  ['reading', 'books', 'writing'],
  ['photography', 'art', 'museums'],
  ['sports', 'basketball', 'running'],
  ['gaming', 'technology', 'coding'],
  ['movies', 'netflix', 'cinema'],
  ['dancing', 'salsa', 'bachata'],
  ['dogs', 'pets', 'animals'],
  ['beach', 'surfing', 'swimming'],
  ['camping', 'outdoors', 'nature'],
  ['fashion', 'shopping', 'style'],
  ['volunteering', 'charity', 'community'],
];

const cities = [
  { city: 'New York', country: 'USA', coordinates: [-74.006, 40.7128] },
  { city: 'Los Angeles', country: 'USA', coordinates: [-118.2437, 34.0522] },
  { city: 'Chicago', country: 'USA', coordinates: [-87.6298, 41.8781] },
  { city: 'Houston', country: 'USA', coordinates: [-95.3698, 29.7604] },
  { city: 'Phoenix', country: 'USA', coordinates: [-112.074, 33.4484] },
  { city: 'San Francisco', country: 'USA', coordinates: [-122.4194, 37.7749] },
  { city: 'Miami', country: 'USA', coordinates: [-80.1918, 25.7617] },
  { city: 'Seattle', country: 'USA', coordinates: [-122.3321, 47.6062] },
  { city: 'Boston', country: 'USA', coordinates: [-71.0589, 42.3601] },
  { city: 'Austin', country: 'USA', coordinates: [-97.7431, 30.2672] },
];

// Helper function to get random item from array
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

// Helper function to get random number in range
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper function to get random date of birth (18-45 years old)
const getRandomDOB = () => {
  const age = getRandomNumber(18, 45);
  const year = new Date().getFullYear() - age;
  const month = getRandomNumber(0, 11);
  const day = getRandomNumber(1, 28);
  return new Date(year, month, day);
};

// Generate user data
const generateUser = (index) => {
  const gender = index % 2 === 0 ? 'male' : 'female';
  const firstName = getRandomItem(firstNames[gender]);
  const lastName = getRandomItem(lastNames);
  const phoneNumber = `+1${getRandomNumber(2000000000, 9999999999)}`;
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@example.com`;
  const location = getRandomItem(cities);
  
  // Determine interested in based on gender (for variety)
  let interestedIn;
  if (index % 3 === 0) {
    interestedIn = ['everyone'];
  } else if (gender === 'male') {
    interestedIn = ['female'];
  } else {
    interestedIn = ['male'];
  }

  return {
    firstName,
    lastName,
    phoneNumber,
    email,
    phoneVerified: true,
    phoneVerifiedAt: new Date(),
    dateOfBirth: getRandomDOB(),
    gender,
    interestedIn,
    bio: getRandomItem(bios),
    occupation: getRandomItem(occupations),
    height: getRandomNumber(150, 200),
    interests: getRandomItem(interests),
    location: {
      type: 'Point',
      coordinates: location.coordinates,
      city: location.city,
      country: location.country,
    },
    preferences: {
      ageRange: {
        min: getRandomNumber(18, 25),
        max: getRandomNumber(35, 50),
      },
      maxDistance: getRandomNumber(20, 100),
      showMe: gender === 'male' ? 'female' : 'male',
    },
    isActive: true,
    isVerified: index % 5 === 0, // 20% verified users
    agreedToTerms: true,
    agreedToPrivacyPolicy: true,
    termsAgreedAt: new Date(),
  };
};

// Main seed function
const seedUsers = async () => {
  try {
    console.log('🌱 Starting user seed...');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing test users (optional - comment out if you want to keep existing users)
    const deleteResult = await User.deleteMany({ 
      email: { $regex: /@example\.com$/ } 
    });
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing test users`);

    // Generate and insert users
    const users = [];
    for (let i = 1; i <= 20; i++) {
      users.push(generateUser(i));
    }

    const insertedUsers = await User.insertMany(users);
    console.log(`✅ Successfully created ${insertedUsers.length} users`);

    // Display summary
    console.log('\n📊 User Summary:');
    console.log(`   Male users: ${insertedUsers.filter(u => u.gender === 'male').length}`);
    console.log(`   Female users: ${insertedUsers.filter(u => u.gender === 'female').length}`);
    console.log(`   Verified users: ${insertedUsers.filter(u => u.isVerified).length}`);
    console.log(`   Cities represented: ${new Set(insertedUsers.map(u => u.location.city)).size}`);

    console.log('\n✨ Seed completed successfully!');
    
    // Display sample users
    console.log('\n👥 Sample Users:');
    insertedUsers.slice(0, 5).forEach(user => {
      console.log(`   - ${user.firstName} ${user.lastName}, ${user.age} (${user.gender}) - ${user.location.city}`);
    });

  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
    process.exit(0);
  }
};

// Run the seed
seedUsers();

