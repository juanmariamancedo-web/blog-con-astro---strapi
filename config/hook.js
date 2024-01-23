const index = "posts"

module.exports = {
    settings: {
      // ...
      algolia: {
        enabled: true,
        applicationId: '51UBXGHEYI',
        apiKey: '2f56745a10bcd1f8e415d8bd0359186c',
        debug: true,              // default: false
      },
    },
    lifecycles: {
        afterCreate(result, data) {
            if (result.published_at) {
                strapi.services.algolia.saveObject(result, index);
            }
        },
        afterUpdate(result, params, data) {
            if (result.published_at) {
                strapi.services.algolia.saveObject(result, index);
            } else {
            strapi.services.algolia.deleteObject(result.id, index);
            }
        },
        afterDelete(result, params) {
          strapi.services.algolia.deleteObject(result.id, index);
        },
      },
  };