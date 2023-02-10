const dotenv = require("dotenv");
dotenv.config();

const { USER_DAYONE, USER_SUPER } = process.env;
const siteUsers = { dayone: USER_DAYONE, supervisor: USER_SUPER };

const allowedOrigins = [
  "https://uhappy.gr",
  "https://www.uhappy.gr",
  "https://day-one.gr",
  "https://www.day-one.gr",
  "https://supervisor.gr",
  "https://www.supervisor.gr",
  "https://api.uhappy.gr/",
  "https://www.api.uhappy.gr/",
  "https://app.uhappy.gr/",
  "https://www.app.uhappy.gr/",
];

module.exports = { siteUsers, allowedOrigins };
