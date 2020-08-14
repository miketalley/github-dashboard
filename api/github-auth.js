const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_STATE,
  GITHUB_REDIRECT_URI,
} = process.env;
const ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token";

module.exports = (req, res) => {
  const { code } = req.query;
  const QUERY_STRING = `?code=${code}&client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&state=${GITHUB_STATE}&redirect_uri=${GITHUB_REDIRECT_URI}`;

  res.set(`location`, `${ACCESS_TOKEN_URL}${QUERY_STRING}`);
  res.status(301).send();
};
