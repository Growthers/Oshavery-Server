import express from "express";
const app: express.Express = express();
import cors from "cors";
app.use(cors());
app.use(express.json());

const infoRouter = require("./routes/info");
const userRouter = require("./routes/user");
const guildRouter = require("./routes/guild");
const channelRouter = require("./routes/channel");
const messageRouter = require("./routes/message");
const mediaRouter = require("./routes/media");

import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";
import dotenv from "dotenv";

export const conf = dotenv.config();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
}

export const checkJwt = jwt({
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



app.use("/", infoRouter);
app.use("/users", checkJwt, userRouter);
app.use("/guilds", checkJwt, guildRouter);
app.use("/", checkJwt, channelRouter);
app.use("/channels", checkJwt, messageRouter);
app.use("/files", checkJwt, mediaRouter);


app.listen(3080,() => {
  const black   = '\u001b[30m';
  const red     = '\u001b[31m';
  const green   = '\u001b[32m';
  const yellow  = '\u001b[33m';
  const blue    = '\u001b[34m';
  const magenta = '\u001b[35m';
  const cyan    = '\u001b[36m';
  const white   = '\u001b[37m';
  const reset   = '\u001b[0m';
  console.log(`
  ${red}░█████╗${reset}${green}░░██████╗${reset}${yellow}██╗░░██╗${reset}${blue}░█████╗${reset}${magenta}░██╗░░░██╗${reset}${cyan}███████╗${reset}${black}██████${reset}${white}╗░██╗░░░██╗
  ${red}██╔══██╗${reset}${green}██╔════╝${reset}${yellow}██║░░██║${reset}${blue}██╔══██╗${reset}${magenta}██║░░░██║${reset}${cyan}██╔════╝${reset}${black}██${white}╔══${black}██${white}╗╚██╗░██╔╝${reset}
  ${red}██║░░██║${reset}${green}╚█████╗${reset}${yellow}░███████║${reset}${blue}███████║${reset}${magenta}╚██╗░██╔╝${reset}${cyan}█████╗${reset}${black}░░██████${reset}${white}╔╝░╚████╔╝░${reset}
  ${red}██║░░██║${reset}${green}░╚═══██╗${reset}${yellow}██╔══██║${reset}${blue}██╔══██║${reset}${magenta}░╚████╔╝${reset}${cyan}░██╔══╝░░${reset}${black}██${white}╔══${black}██${white}╗░░╚██╔╝░░${reset}
  ${red}╚█████╔╝${reset}${green}██████╔╝${reset}${yellow}██║░░██║${reset}${blue}██║░░██║${reset}${magenta}░░╚██╔╝░░${reset}${cyan}███████╗${reset}${black}██${white}║${black}░░██${white}║░░░██║░░░${reset}
  ${red}░╚════╝░${reset}${green}╚═════╝░${reset}${yellow}╚═╝░░╚═╝${reset}${blue}╚═╝░░╚═╝${reset}${magenta}░░░╚═╝░░░${reset}${cyan}╚══════╝${reset}${white}╚═╝${black}░░${white}╚═╝░░░╚═╝░░░${reset}

  Oshavery(alpha)
  |c| 2021 Oshavery Developers

  [info] listening at http://localhost:3080
  `)
});
