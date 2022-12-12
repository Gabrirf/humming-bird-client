const { getDoc } = require('../../../../openapi/api-doc');

module.exports = (assetsController) => {
  const route = {
    put: [assetsController.activateAllAssets],
  };

  const doc = getDoc(__filename);
  Object.keys(route).forEach((method) => {
    route[method].apiDoc = doc[method];
  });

  return route;
};
