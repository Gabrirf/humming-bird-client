const { postToHummingBird } = require('./core');

async function createUser(body) {
  const endpoint = '/users';
  return postToHummingBird({ endpoint, body });
}

module.exports = {
  createUser,
};
