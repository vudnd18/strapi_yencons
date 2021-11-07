"use strict";
const { sanitizeEntity } = require("strapi-utils");
const { makePaginateSearch } = require("../../../lib/helper");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findOne(ctx) {
    const { id } = ctx.params;
    const entity = await strapi.services.design.findOne({ slug: id });
    return sanitizeEntity(entity, { model: strapi.models.design });
  },

  async find(ctx) {
    const { page = 1, ...query } = ctx.query;
    const limit = ctx.query._limit || 6;
    const start = (page - 1) * limit;
    let count, paginate, data;

    query._start = start;
    query._limit = limit;
    query._sort = "created_at:DESC";
    if (ctx.query._q) {
      count = await strapi.services.design.countSearch(query);
      const entities = await strapi.services.design.search(query);
      data = entities.map((entity) =>
        sanitizeEntity(entity, { model: strapi.models.blog })
      );
    } else {
      count = await strapi.services.design.count(query);
      const entities = await strapi.services.design.find(query);
      data = entities.map((entity) =>
        sanitizeEntity(entity, { model: strapi.models.design })
      );
    }
    paginate = makePaginateSearch(count, limit, page);
    return {
      data,
      paginate,
    };
  },
};
