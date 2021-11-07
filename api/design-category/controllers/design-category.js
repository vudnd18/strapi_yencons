"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findOne(ctx) {
    const { id } = ctx.params;
    console.log(id);
    const entity = await strapi.services['design-category'].findOne({
      slug: id,
    });
    return sanitizeEntity(entity, { model: strapi.models['design-category'] });
  },
};
