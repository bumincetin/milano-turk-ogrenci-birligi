'use strict';

/**
 * ticket-history service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::ticket-history.ticket-history');
