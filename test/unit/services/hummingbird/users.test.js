const test = require('ava');
const sinon = require('sinon');
const got = require('got');

const { hummingBirdService } = require('../../../../src/services');

const responseMock = {
  body: {
    token: 'token',
  },
};

const errorMock = {
  response: {
    statusCode: 400,
  },
};

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

const gotStub = sinon.stub(got, 'post');

test.serial('Test create user to humming bird', async (t) => {
  gotStub.returns(responseMock);
  const res = await hummingBirdService.createUser(userMock);
  t.is(res.token, responseMock.body.token);
});

test.serial('Test create user to humming bird ERROR', async (t) => {
  gotStub.rejects(errorMock);
  const { accountId, ...userMockMissing } = userMock;
  const res = await hummingBirdService.createUser(userMockMissing);
  t.is(res.response.statusCode, errorMock.response.statusCode);
});
