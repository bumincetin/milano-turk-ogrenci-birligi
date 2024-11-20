'use strict';

/**
 * event service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::event.event', ({ strapi }) => ({
  async isAllowedToEnroll(userId) {
    const user = await strapi.plugins['users-permissions'].services.user.fetch(userId);
    return user && !user.blocked;
  }
}));
