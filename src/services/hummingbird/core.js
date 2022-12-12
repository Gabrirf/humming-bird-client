const got = require('got');

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

module.exports = {
  loginIntoHummingBird,
  setConfig,
};
