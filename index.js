const express = require("express");
const chalk = require("chalk");
const dotenv = require("dotenv");
const { allowedOrigins } = require("./data/sitesObjects");

dotenv.config();
const app = express();
app.use(express.json());

const { PORT, NODE_ENV, APP_VERSION } = process.env;
const port = PORT || 3000;

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//! Website Contact Forms
const contact_form = require("./routes/contact_form");
app.use("/contact_form", contact_form);

//! Espa Ergani
const espa_ergani = require("./routes/espa_ergani");
app.use("/espa_ergani", espa_ergani);

//! Espa
const espa = require("./routes/espa");
app.use("/espa", espa);

//! Rebuild Website Webhook
const gatsby_build = require("./routes/gatsby_build");
app.use("/gatsby_build", gatsby_build);

//! Test Point
app.get("/ping", (req, res) => {
  res.status(404).send(`SERVICE RUNNING ${APP_VERSION}`);
});

app.listen(port, () => {
  console.log(
    `Server running ${chalk.cyanBright.bold(
      NODE_ENV
    )} environment on port: ${chalk.cyanBright.bold(port)}`
  );
});

module.exports = app;
