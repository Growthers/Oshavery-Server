import {FastifyInstance} from "fastify";
import {InstanceInfoRouter} from "./info";
import {ChannelRouter} from "./channel";
import {MediaRouter} from "./media";
import {UserRouter} from "./user";
import {GuildRouter} from "./guild";
// import jwt from "express-jwt";
// import jwksRsa from "jwks-rsa";
//
// if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
//   throw new Error('Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file');
// }
//
// export const checkJwt = jwt({
//   // Dynamically provide a signing key based on the [Key ID](https://tools.ietf.org/html/rfc7515#section-4.1.4) header parameter ("kid") and the signing keys provided by the JWKS endpoint.
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
//   }),
//
//   // Validate the audience and the issuer.
//   audience: process.env.AUTH0_AUDIENCE,
//   issuer: [`https://${process.env.AUTH0_DOMAIN}/`],
//   algorithms: ['RS256']
// });

export async function MainRouting(server: FastifyInstance) {
  // /version /server-info
  await InstanceInfoRouter(server);
  await ChannelRouter(server);
  await MediaRouter(server);
  await UserRouter(server);
  await GuildRouter(server)
}
