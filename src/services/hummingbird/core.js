const got = require('got');

const INVALID_CODE = 'InvalidCredentials';

let config = {};
let hummingBirdSession = {};

async function loginIntoHummingBird() {
  const url = `${config.url}/auth/token`;

  const body = {
    username: config.username,
    password: config.password,
  };

  const options = {
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    json: body,
  };

  const res = await got.post(url, { ...options });
  return res.body;
}

async function setConfig(hummingBirdConfig) {
  config = hummingBirdConfig;
  hummingBirdSession = await loginIntoHummingBird();
}

async function sendRequest(request, data, retry = false) {
  const { endpoint, query, body: json } = data;
  if (retry) {
    hummingBirdSession = await loginIntoHummingBird();
  }

  const url = `${config.url}${endpoint}${query || ''}`;

  const options = {
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': hummingBirdSession.token,
    },
    json,
  };
  try {
    const res = await request(url, { ...options });
    return res.body;
  } catch (error) {
    if (error.response && error.response.statusCode === 401) {
      if (error.code === INVALID_CODE) {
        return sendRequest(request, data, true);
      }
    }
    return error;
  }
}

async function getToHummingBird(data) {
  return sendRequest(got.get, data);
}

async function postToHummingBird(data) {
  return sendRequest(got.post, data);
}

async function putToHummingBird(data) {
  return sendRequest(got.put, data);
}

module.exports = {
  loginIntoHummingBird,
  setConfig,
  getToHummingBird,
  postToHummingBird,
  putToHummingBird,
};
