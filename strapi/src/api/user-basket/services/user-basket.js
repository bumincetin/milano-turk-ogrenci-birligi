"use strict";

const { find } = require("../../../../config/middlewares");

/**
 * user-basket service
 */

// @ts-ignore
const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::user-basket.user-basket",
  ({ strapi }) => ({
    async findAll(...args) {
      console.log("args: ", args);
      const { results, pagination } = await super.find(...args);

      return {
        results: results.map((result) => {
          return {
            ...result,
            // user: result.user.id,
            // user_baskets: result.user_baskets.map((basket) => basket.id),
            // createdBy: result.createdBy.id,
            // updatedBy: result.updatedBy.id,
          };
        }),
        pagination,
      };
    },
  })
);
