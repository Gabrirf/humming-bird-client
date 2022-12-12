const { HttpStatusError } = require('common-errors');

async function getPing(req, res, next) {
  try {
    return res.status(200).send('pong');
  } catch (err) {
    return next(err);
  }
}

async function postPing(req, res, next) {
  try {
    return res.status(201).send(req.body);
  } catch (err) {
    return next(err);
  }
}

async function putPing(req, res, next) {
  const { id } = req.params;
  try {
    if (!id) throw new HttpStatusError(404, `The app with '${id}' id not exist`);
    return res.status(200).send(id);
  } catch (err) {
    return next(err);
  }
}

async function deletePing(req, res, next) {
  const { id } = req.params;
  try {
    if (!id) throw new HttpStatusError(404, `The app with '${req.query.id}' id not exist`);
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getPing,
  postPing,
  putPing,
  deletePing,
};
