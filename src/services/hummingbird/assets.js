const { getToHummingBird, putToHummingBird } = require('./core');

async function getAssetsByAccount(accountId) {
  const query = `?accountId=${accountId}`;
  const endpoint = '/assets';
  return getToHummingBird({ endpoint, query });
}

async function activateAsset(iccid, body) {
  const endpoint = `/assets/${iccid}/subscribe`;
  return putToHummingBird({ endpoint, body });
}

module.exports = {
  getAssetsByAccount,
  activateAsset,
};
