const dotenv = require("dotenv");
dotenv.config();

const {
  HOST_DAYONE,
  PORT_DAYONE,
  SECURE_DAYONE,
  USER_DAYONE,
  PASS_DAYONE,
  HOST_SUPER,
  PORT_SUPER,
  SECURE_SUPER,
  USER_SUPER,
  PASS_SUPER,
} = process.env;

const mailConfigs = {
  supervisor: {
    host: HOST_SUPER,
    port: PORT_SUPER,
    secure: SECURE_SUPER,
    auth: {
      user: USER_SUPER,
      pass: PASS_SUPER,
    },
  },

  dayone: {
    host: HOST_DAYONE,
    port: PORT_DAYONE,
    secure: SECURE_DAYONE,
    auth: {
      user: USER_DAYONE,
      pass: PASS_DAYONE,
    },
  },
};

module.exports = mailConfigs;
