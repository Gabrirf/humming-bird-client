const { getToHummingBird } = require('./core');

async function getAssetsByAccount(accountId) {
  const query = `?accountId=${accountId}`;
  const endpoint = '/assets';
  return getToHummingBird({ endpoint, query });
}

module.exports = {
  getAssetsByAccount,
};
