const { hummingBirdService } = require('../services');

async function createUser(req, res, next) {
  try {
    const createdUser = await hummingBirdService.createUser(req.body);
    return res.status(201).send(createdUser);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  createUser,
};
