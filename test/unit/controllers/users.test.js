const test = require('ava');
const sinon = require('sinon');

const { usersController } = require('../../../src/controllers');
const { hummingBirdService } = require('../../../src/services');

const { mockReq, mockRes, mockNext } = require('../../utils/controllers');

const userMock = {
  accountId: 'string',
  username: 'string',
  password: 'string',
  email: 'string',
  status: 'string',
  permissions: [
    {
      accountId: 'string',
      roles: [
        'string',
      ],
    },
  ],
};

const responseMock = { body: 'ok' };

const errorMock = {
  code: 'BadRequest',
  message: 'There was a problem with your data, please try again.',
};

const hummingBirdServiceStub = sinon.stub(hummingBirdService, 'createUser');

test('Create user', async (t) => {
  hummingBirdServiceStub.returns(Promise.resolve(responseMock));
  const body = userMock;
  const res = await usersController.createUser(mockReq({ body }), mockRes(), mockNext);
  t.is(res.statusCode, 201);
  t.deepEqual(res.body, responseMock);
});

test('Create user Error', async (t) => {
  hummingBirdServiceStub.rejects(Promise.resolve(errorMock));
  const body = userMock;
  const res = await usersController.createUser(mockReq({ body }), mockRes(), mockNext);
  t.is(res.code, 'BadRequest');
  t.deepEqual(res, errorMock);
});
