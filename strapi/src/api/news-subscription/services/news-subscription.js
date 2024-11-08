'use strict';

/**
 * news-subscription service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::news-subscription.news-subscription');
