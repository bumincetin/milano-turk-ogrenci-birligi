"use strict";

/**
 * purchase service
 */

// @ts-ignore
const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::purchase.purchase");
