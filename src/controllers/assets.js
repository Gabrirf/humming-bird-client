const { hummingBirdService } = require('../services');

const { arrayUtils } = require('../helpers');

async function listAssets(req, res, next) {
  try {
    const { accountId } = req.query;
    const assetsList = await hummingBirdService.getAssetsByAccount(accountId);
    return res.status(200).send(assetsList);
  } catch (err) {
    return next(err);
  }
}

async function activateAllAssets(req, res, next) {
  try {
    const { accountId } = req.body;
    const assetsList = await hummingBirdService.getAssetsByAccount(accountId);

    const reshapedAssets = arrayUtils.reshapeRows(assetsList, 10);
    const assetsActivationResultsPromises = reshapedAssets.map(async (assetSet) => {
      const results = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const asset of assetSet) {
        // eslint-disable-next-line no-await-in-loop
        const result = await hummingBirdService.activateAsset(asset.iccid, req.body);
        results.push(result);
      }
      return results;
    });

    const assetsActivationResults = await Promise.all(assetsActivationResultsPromises);

    return res.status(200).send(assetsActivationResults.flat());
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  listAssets,
  activateAllAssets,
};
