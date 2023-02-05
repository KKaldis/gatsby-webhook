import { Octokit } from "@octokit/rest";
import express from "express";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
const { GITHUB_REPO, PORT, GITHUB_OWNER, GITHUB_TOKEN, NODE_ENV, GITHUB_WORKFLOW_ID, PASS_KEY } = process.env;
const port = PORT || 3000;

app.post("/build/:key", async (req, res) => {
  const { key } = req.params;
  const octokit = new Octokit({
    auth: GITHUB_TOKEN
  })

  if (key === PASS_KEY) {
    await octokit.request(`POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches`, {
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      workflow_id: GITHUB_WORKFLOW_ID,
      ref: 'main',
    })
  }

  res.end()
});

app.get("/ping", (req, res) => {
  res.send('WEBSITE BUILD SERVICE RUNNING')
});


app.listen(port, () => {
  console.log(
    `Server running ${chalk.cyanBright.bold(NODE_ENV)} environment on port: ${chalk.cyanBright.bold(port)}`
  );
});
