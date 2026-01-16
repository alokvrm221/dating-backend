const AppConfig = require('../models/AppConfig');
const { NotFoundError, ValidationError } = require('../utils/errorHandler');

class AppConfigService {
  /**
   * Get all config settings
   */
  async getAllConfigs(isPublicOnly = false) {
    const query = isPublicOnly ? { isPublic: true } : {};
    const configs = await AppConfig.find(query).sort({ category: 1, key: 1 });
    
    // Convert to key-value object
    const configObject = {};
    configs.forEach((config) => {
      configObject[config.key] = {
        value: config.value,
        description: config.description,
        category: config.category,
      };
    });
    
    return configObject;
  }

  /**
   * Get config by key
   */
  async getConfigByKey(key) {
    const config = await AppConfig.findOne({ key });
    
    if (!config) {
      throw new NotFoundError(`Config key '${key}' not found`);
    }
    
    return config;
  }

  /**
   * Get multiple configs by keys
   */
  async getConfigsByKeys(keys) {
    const configs = await AppConfig.find({ key: { $in: keys } });
    
    const configObject = {};
    configs.forEach((config) => {
      configObject[config.key] = config.value;
    });
    
    return configObject;
  }

  /**
   * Create or update config
   */
  async upsertConfig(key, value, options = {}) {
    const { description, category, isPublic, isEditable } = options;

    // Check if config exists and is editable
    const existingConfig = await AppConfig.findOne({ key });
    
    if (existingConfig && !existingConfig.isEditable) {
      throw new ValidationError(`Config '${key}' is not editable`);
    }

    const config = await AppConfig.findOneAndUpdate(
      { key },
      {
        key,
        value,
        ...(description && { description }),
        ...(category && { category }),
        ...(isPublic !== undefined && { isPublic }),
        ...(isEditable !== undefined && { isEditable }),
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return config;
  }

  /**
   * Update config value only
   */
  async updateConfigValue(key, value) {
    const config = await AppConfig.findOne({ key });
    
    if (!config) {
      throw new NotFoundError(`Config key '${key}' not found`);
    }
    
    if (!config.isEditable) {
      throw new ValidationError(`Config '${key}' is not editable`);
    }

    config.value = value;
    await config.save();

    return config;
  }

  /**
   * Delete config
   */
  async deleteConfig(key) {
    const config = await AppConfig.findOne({ key });
    
    if (!config) {
      throw new NotFoundError(`Config key '${key}' not found`);
    }
    
    if (!config.isEditable) {
      throw new ValidationError(`Config '${key}' cannot be deleted`);
    }

    await AppConfig.deleteOne({ key });
    
    return { message: `Config '${key}' deleted successfully` };
  }

  /**
   * Initialize default configs
   */
  async initializeDefaults() {
    const defaults = [
      {
        key: 'base_url',
        value: 'http://localhost:5000',
        description: 'Base URL for the API',
        category: 'api',
        isPublic: true,
        isEditable: true,
      },
      {
        key: 'api_version',
        value: 'v1',
        description: 'Current API version',
        category: 'api',
        isPublic: true,
        isEditable: false,
      },
      {
        key: 'app_name',
        value: 'Dating App',
        description: 'Application name',
        category: 'general',
        isPublic: true,
        isEditable: true,
      },
      {
        key: 'maintenance_mode',
        value: false,
        description: 'Enable/disable maintenance mode',
        category: 'general',
        isPublic: true,
        isEditable: true,
      },
      {
        key: 'max_photos_per_user',
        value: 6,
        description: 'Maximum photos allowed per user',
        category: 'feature',
        isPublic: true,
        isEditable: true,
      },
      {
        key: 'free_swipes_per_day',
        value: 100,
        description: 'Free swipes allowed per day for non-premium users',
        category: 'feature',
        isPublic: false,
        isEditable: true,
      },
    ];

    for (const config of defaults) {
      await AppConfig.findOneAndUpdate(
        { key: config.key },
        config,
        { upsert: true, new: true }
      );
    }

    return { message: 'Default configs initialized' };
  }
}

module.exports = new AppConfigService();

