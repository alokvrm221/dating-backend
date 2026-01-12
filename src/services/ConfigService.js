const configOptions = require('../constants/configOptions');

/**
 * Config Service
 * Provides static configuration data for frontend
 */
class ConfigService {
  /**
   * Get all configuration options
   * @returns {Object} All config options
   */
  static getAllOptions() {
    return configOptions;
  }

  /**
   * Get specific configuration by key
   * @param {String} key - Configuration key
   * @returns {Array|Object|null} Configuration value
   */
  static getOptionByKey(key) {
    return configOptions[key] || null;
  }

  /**
   * Get multiple configurations by keys
   * @param {Array} keys - Array of configuration keys
   * @returns {Object} Object containing requested configurations
   */
  static getOptionsByKeys(keys) {
    const result = {};
    keys.forEach((key) => {
      if (configOptions[key]) {
        result[key] = configOptions[key];
      }
    });
    return result;
  }

  /**
   * Get hobbies grouped by category
   * @returns {Object} Hobbies grouped by category
   */
  static getHobbiesByCategory() {
    const hobbies = configOptions.hobbies;
    const grouped = {};

    hobbies.forEach((hobby) => {
      if (!grouped[hobby.category]) {
        grouped[hobby.category] = [];
      }
      grouped[hobby.category].push({
        value: hobby.value,
        label: hobby.label,
      });
    });

    return grouped;
  }

  /**
   * Get all available configuration keys
   * @returns {Array} Array of available configuration keys
   */
  static getAvailableKeys() {
    return Object.keys(configOptions);
  }

  /**
   * Search hobbies by query
   * @param {String} query - Search query
   * @returns {Array} Matching hobbies
   */
  static searchHobbies(query) {
    const lowerQuery = query.toLowerCase();
    return configOptions.hobbies.filter(
      (hobby) =>
        hobby.label.toLowerCase().includes(lowerQuery) ||
        hobby.value.toLowerCase().includes(lowerQuery) ||
        hobby.category.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Get options for onboarding (essential fields only)
   * @returns {Object} Onboarding options
   */
  static getOnboardingOptions() {
    return {
      genders: configOptions.genders,
      interestedIn: configOptions.interestedIn,
      datingIntentions: configOptions.datingIntentions,
      heightRange: configOptions.heightRange,
      ageRange: configOptions.ageRange,
    };
  }

  /**
   * Get options for profile completion
   * @returns {Object} Profile completion options
   */
  static getProfileOptions() {
    return {
      religions: configOptions.religions,
      familyPlans: configOptions.familyPlans,
      educationLevels: configOptions.educationLevels,
      politicalViews: configOptions.politicalViews,
      zodiacSigns: configOptions.zodiacSigns,
      languages: configOptions.languages,
      pets: configOptions.pets,
      communicationStyles: configOptions.communicationStyles,
      loveLanguages: configOptions.loveLanguages,
    };
  }

  /**
   * Get lifestyle options
   * @returns {Object} Lifestyle options
   */
  static getLifestyleOptions() {
    return {
      drinkingHabits: configOptions.drinkingHabits,
      smokingHabits: configOptions.smokingHabits,
      marijuanaUsage: configOptions.marijuanaUsage,
      drugsUsage: configOptions.drugsUsage,
      workoutHabits: configOptions.workoutHabits,
      dietPreferences: configOptions.dietPreferences,
      sleepingHabits: configOptions.sleepingHabits,
      socialMediaUsage: configOptions.socialMediaUsage,
    };
  }

  /**
   * Get relationship options
   * @returns {Object} Relationship options
   */
  static getRelationshipOptions() {
    return {
      datingIntentions: configOptions.datingIntentions,
      relationshipTypes: configOptions.relationshipTypes,
      familyPlans: configOptions.familyPlans,
      loveLanguages: configOptions.loveLanguages,
    };
  }

  /**
   * Validate if a value exists in a config option
   * @param {String} key - Configuration key
   * @param {String} value - Value to validate
   * @returns {Boolean} Whether the value is valid
   */
  static isValidOption(key, value) {
    const options = configOptions[key];
    if (!options || !Array.isArray(options)) {
      return false;
    }
    return options.some((option) => option.value === value);
  }

  /**
   * Get valid values for a config key (for validation)
   * @param {String} key - Configuration key
   * @returns {Array} Array of valid values
   */
  static getValidValues(key) {
    const options = configOptions[key];
    if (!options || !Array.isArray(options)) {
      return [];
    }
    return options.map((option) => option.value);
  }
}

module.exports = ConfigService;
