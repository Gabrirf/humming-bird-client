const { getDoc } = require('../../openapi/api-doc');

module.exports = (assetsController) => {
  const route = {
    get: [assetsController.listAssets],
  };

  const doc = getDoc(__filename);
  Object.keys(route).forEach((method) => {
    route[method].apiDoc = doc[method];
  });

  return route;
};
