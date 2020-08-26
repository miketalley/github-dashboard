const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_STATE,
  GITHUB_REDIRECT_URI,
} = process.env;
const ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token";

module.exports = (req, res) => {
  const { code } = req.query;
  const queryString = `?code=${code}&client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&state=${GITHUB_STATE}&redirect_uri=${GITHUB_REDIRECT_URI}`;
  const redirectUrl = `${ACCESS_TOKEN_URL}${queryString}`;

  res.writeHead(302, {
    Location: redirectUrl,
  });

  res.end();
};
