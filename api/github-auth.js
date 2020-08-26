const request = require("request");
const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_STATE,
  GITHUB_REDIRECT_URI,
} = process.env;
const ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token";

module.exports = (req, res) => {
  const { code } = req.query;
  // const queryString = `?code=${code}&client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&state=${GITHUB_STATE}&redirect_uri=${GITHUB_REDIRECT_URI}`;
  // const redirectUrl = `${ACCESS_TOKEN_URL}${queryString}`;
  let redirectUrl =
    "https://github-dashboard.miketalley.vercel.app/github-access-token-return";
  let access_token;
  let scope;
  let token_type;

  request.post(
    {
      url: ACCESS_TOKEN_URL,
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
      console.log("Resp: ", response, body);
      access_token = response.access_token;
      scope = response.scope;
      token_type = response.token_type;
    }
  );

  res.writeHead(302, {
    Location: `${redirectUrl}?access_token=${access_token}&scope=${scope}&token_type=${token_type}`,
  });

  res.end();
};
