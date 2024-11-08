'use strict';

/**
 * user-inbox service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-inbox.user-inbox');
