const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

// exports.checkJwt = jwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestPerMinute: 10,
//     jwksUri: "https://stachowitz.us.auth0.com/.well-known/jwks.json",
//   }),
//   audience: "https://stachowitz.us.auth0.com/api/v2/",
//   issuer: "https://stachowitz.us.auth0.com/",
//   algorithms: ["RS256"],
// });

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
