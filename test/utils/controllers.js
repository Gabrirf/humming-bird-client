const mockReq = (content = {}) => {
  const {
    path, query, body, params, headers, ip, connection,
  } = content;
  const req = {};
  req.ip = ip;
  req.connection = connection;
  req.path = path || '/test';
  req.query = query || {};
  req.params = params || {};
  req.headers = { host: 'localtest', ...headers };
  req.body = body || {};
  return req;
};

const mockRes = () => {
  const res = {};
  res.locals = {};
  res.statusCode = 200;
  res.status = function status(statusCode) {
    this.statusCode = statusCode;
    return this;
  };
  res.set = function set() {
    this.setCalled = true;
    return this;
  };
  res.send = function send(message) {
    this.body = message;
    return this;
  };
  res.on = function on(eventText, callback) {
    callback(eventText);
    this.onCalled = true;
  };
  return res;
};

const mockNext = (next = 'next') => next;

module.exports = {
  mockReq,
  mockRes,
  mockNext,
};
