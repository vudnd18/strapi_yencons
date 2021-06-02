const helper = require("../../../lib/helper");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    beforeCreate: async (model) => {
      if (model.name) {
        model.slug = helper.convertSlug(model.name);
      }
    },
    beforeUpdate: async (params, model) => {
      if (model.name) {
        model.slug = helper.convertSlug(model.name);
      }
    },
  },
};
