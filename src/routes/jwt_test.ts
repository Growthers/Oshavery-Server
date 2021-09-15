import jwt from "express-jwt";
import jwtAuthz from "express-jwt-authz";
import jwksRsa from "jwks-rsa";
import dotenv from "dotenv";
import express from "express";

const router_jwt = express.Router();

const conf = dotenv.config();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
}

const checkJwt = jwt({
  // Dynamically provide a signing key based on the [Key ID](https://tools.ietf.org/html/rfc7515#section-4.1.4) header parameter ("kid") and the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: [`https://${process.env.AUTH0_DOMAIN}/`],
  algorithms: ['RS256']
});


router_jwt.get('/', checkJwt, function(req:any, res:any) {
  console.log(req.path);
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});

module.exports = router_jwt;
