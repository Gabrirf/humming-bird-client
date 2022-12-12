require('dotenv').config();

const config = {
  app: {
    port: process.env.PORT,
  },
  security: {
    trustedIps: process.env.TRUSTED_IPS && process.env.TRUSTED_IPS.split(','),
    user: process.env.API_USER,
    pass: process.env.API_PASS,
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS, 10),
  },
  hummingbird: {
    url: process.env.HB_URL,
    username: process.env.HB_USER,
    password: process.env.HB_PASS,
  },
};

module.exports = config;
