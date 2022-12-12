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
    statusCode: 401,
  },
};

const gotStub = sinon.stub(got, 'post');

test.serial('Test login into humming bird', async (t) => {
  gotStub.returns(responseMock);
  const res = await hummingBirdService.loginIntoHummingBird();
  t.is(res.token, responseMock.body.token);
});

test.serial('Test login into humming bird ERROR', async (t) => {
  gotStub.rejects(errorMock);
  try {
    await hummingBirdService.loginIntoHummingBird();
  } catch (error) {
    t.is(error.response.statusCode, errorMock.response.statusCode);
  }
});
