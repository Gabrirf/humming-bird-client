const { getDoc } = require('../../openapi/api-doc');

module.exports = pingController => {
  const route = {
    get: [pingController.getPing],
    post: [pingController.postPing],
    put: [pingController.putPing],
    del: [pingController.deletePing],
  };

  const doc = getDoc(__filename);
  Object.keys(route).forEach(method => {
    route[method].apiDoc = doc[method];
  });

  return route;
};
