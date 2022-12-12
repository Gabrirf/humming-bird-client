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

const gotStub = sinon.stub(got, 'get');

test.serial('Test create user to humming bird', async (t) => {
  gotStub.returns(responseMock);
  const res = await hummingBirdService.getAssetsByAccount('accountId');
  t.is(res.token, responseMock.body.token);
});

test.serial('Test create user to humming bird ERROR', async (t) => {
  gotStub.rejects(errorMock);
  const res = await hummingBirdService.getAssetsByAccount('');
  t.is(res.response.statusCode, errorMock.response.statusCode);
});
