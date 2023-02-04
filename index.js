import express from "express";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/webhook", (req, res) => {
  console.log(req.body);
  res.send("Webhook received");
});

app.listen(port, () => {
  console.log(
    `Server running ${chalk.cyanBright.bold(
      process.env.NODE_ENV
    )} environment on port: ${chalk.cyanBright.bold(port)}`
  );
});
