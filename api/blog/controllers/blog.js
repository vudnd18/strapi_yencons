"use strict";
const { sanitizeEntity } = require("strapi-utils");
const { makePaginateSearch } = require("../../../lib/helper");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   *
   * @param {*} ctx
   * @returns {Obejct}
   */
  async findOne(ctx) {
    const { slug } = ctx.params;
    const entity = await strapi.services.blog.findOne({ slug });
    return sanitizeEntity(entity, { model: strapi.models.blog });
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
      count = await strapi.services.blog.countSearch(query);
      const entities = await strapi.services.blog.search(query);
      data = entities.map((entity) =>
        sanitizeEntity(entity, { model: strapi.models.blog })
      );
    } else {
      count = await strapi.services.blog.count(query);
      const entities = await strapi.services.blog.find(query);
      data = entities.map((entity) =>
        sanitizeEntity(entity, { model: strapi.models.blog })
      );
    }
    paginate = makePaginateSearch(count, limit, page);
    return {
      data,
      paginate,
    };
  },
};
