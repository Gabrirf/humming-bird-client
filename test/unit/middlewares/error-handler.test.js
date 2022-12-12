const test = require('ava');

const errorHandler = require('../../../src/middlewares/error-handler');

const { mockReq, mockRes } = require('../../utils/controllers');

test('400 Bad Request: Validation', async (t) => {
  const err = {
    status: 400,
    stack: {
      search: function status(statusCode) {
        this.statusCode = statusCode;
        return this;
      },
    },
    errors: [{
      errorCode: 'required.openapi.requestValidation',
      message: 'should have required property',
    }],
  };
  const req = mockReq();
  const res = mockRes();
  const errorResponse = await errorHandler(err, req, res);
  t.is(errorResponse.statusCode, 400);
});

test('404 Not Found', async (t) => {
  const err = {
    status: 404,
    message: 'Not Found',
  };
  const req = mockReq();
  const res = mockRes().status(404);
  const errorResponse = await errorHandler(err, req, res);
  t.is(errorResponse.statusCode, err.status);
  t.is(errorResponse.body.message, err.message);
});

test('500 Internal server error', async (t) => {
  const err = new Error();
  const req = mockReq('POST');
  const res = mockRes();
  const errorResponse = await errorHandler(err, req, res);
  t.is(errorResponse.statusCode, 500);
  t.is(errorResponse.body.message, 'Server Error');
});
