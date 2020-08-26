const request = require("request");
const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_STATE,
  GITHUB_REDIRECT_URI,
} = process.env;
const ACCESS_TOKEN_BASE_URL = "https://github.com/login/oauth/access_token";

module.exports = (req, res) => {
  const { code } = req.query;
  const queryString = `?code=${code}&client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&state=${GITHUB_STATE}&redirect_uri=${GITHUB_REDIRECT_URI}`;
  const accessTokenUrl = `${ACCESS_TOKEN_BASE_URL}${queryString}`;
  let redirectUrl =
    "https://github-dashboard.miketalley.vercel.app/github-access-token-return";

  request.post(
    {
      url: accessTokenUrl,
      headers: {
        Accept: "application/json",
      },
    },
    (error, response, body) => {
      const { access_token, scope, token_type } = body;

      res.writeHead(302, {
        Location: `${redirectUrl}?access_token=${access_token}&scope=${scope}&token_type=${token_type}&error=${error}`,
      });

      res.end();
    }
  );
};
