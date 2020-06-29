const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const config = require("../config");

exports.checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: "https://stachowitz.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://stachowitz.us.auth0.com/api/v2/",
  issuer: "https://stachowitz.us.auth0.com/",
  algorithms: ["RS256"],
});

exports.checkRole = (role) => (req, res, next) => {
  const user = req.user;
  if (user && user[config.AUTH0_NAMESPACE].includes(role)) {
    next();
  } else {
    return res.status(401).send("bad request");
  }
};
