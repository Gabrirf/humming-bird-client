const { hummingBirdService } = require('../services');

async function listAssets(req, res, next) {
  try {
    const { accountId } = req.query;
    const createdUser = await hummingBirdService.getAssetsByAccount(accountId);
    return res.status(200).send(createdUser);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  listAssets,
};
