const router = require("express").Router();
const Octokit = require("@octokit/rest").Octokit;
const dotenv = require("dotenv");
dotenv.config();

const {
  GITHUB_REPO,
  GITHUB_OWNER,
  GITHUB_TOKEN,
  GITHUB_WORKFLOW_ID,
  GATSBY_BUILD_PASS_KEY,
} = process.env;

router.post("/:key", async (req, res) => {
  const { key } = req.params;
  const octokit = new Octokit({
    auth: GITHUB_TOKEN,
  });

  if (key === GATSBY_BUILD_PASS_KEY) {
    await octokit.request(
      `POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches`,
      {
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        workflow_id: GITHUB_WORKFLOW_ID,
        ref: "main",
      }
    );
  }

  res.end();
});

module.exports = router;
