const { getDoc } = require('../../openapi/api-doc');

module.exports = (usersController) => {
  const route = {
    post: [usersController.createUser],
  };

  const doc = getDoc(__filename);
  Object.keys(route).forEach((method) => {
    route[method].apiDoc = doc[method];
  });

  return route;
};
