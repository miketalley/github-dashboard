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
  let access_token;
  let scope;
  let token_type;
  let access_token_response;
  let access_token_error;
  let access_token_body;

  request.post(
    {
      url: accessTokenUrl,
      headers: {
        Accept: "application/json",
      },
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
      state: GITHUB_STATE,
      redirect_uri: GITHUB_REDIRECT_URI,
    },
    (error, response, body) => {
      access_token_error = error;
      access_token_response = response;
      access_token_body = body;
      console.log("Resp: ", response, body);
      access_token = response.access_token;
      scope = response.scope;
      token_type = response.token_type;

      res.writeHead(302, {
        // Location: `${redirectUrl}?access_token=${access_token}&scope=${scope}&token_type=${token_type}`,
        Location: `${redirectUrl}?error=${JSON.stringify(
          access_token_error
        )}&response=${JSON.stringify(
          access_token_response
        )}&body=${JSON.stringify(access_token_body)}`,
      });

      res.end();
    }
  );
};
