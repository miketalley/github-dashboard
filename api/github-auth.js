const request = require("request");
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;
const ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token";

module.exports = (req, res) => {
  // request.post(ACCESS_TOKEN_URL)
  res.json({
    body: req.body,
    query: req.query,
    cookies: req.cookies,
  });
};
