const test = require('ava');
const express = require('express');
const request = require('supertest');

const expressLoader = require('../../../src/loaders/express');

const app = express();

test.before('Launch Express Server', () => {
  expressLoader(app);
});

test('Send request 200 OK', async t => {
  const res = await request(app).get('/api-docs').send();
  t.is(res.statusCode, 200);
});

test('Send request 404 NotFound', async t => {
  const res = await request(app).get('/NotFound').send();
  t.is(res.statusCode, 404);
});
