import express from "express";
import cors from "cors";
import Log4js from "log4js";
import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";
import dotenv from "dotenv";
import chalk from "chalk";

const infoRouter = require("./routes/info");
const userRouter = require("./routes/user");
const guildRouter = require("./routes/guild");
const channelRouter = require("./routes/channel");
const messageRouter = require("./routes/message");
const mediaRouter = require("./routes/media");

const app: express.Express = express();
const GIT_COMMIT_HASH = process.env.GIT_COMMIT_HASH;
app.use(cors());
app.use(express.json());
Log4js.configure("log-config.json");
export const logger = Log4js.getLogger("system");
export const conf = dotenv.config();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw new Error('Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file');
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

if (process.env.NODE_ENV === "production"){
  app.use("/", infoRouter);
  app.use("/users", checkJwt, userRouter);
  app.use("/guilds", checkJwt, guildRouter);
  app.use("/", checkJwt, channelRouter);
  app.use("/channels", checkJwt, messageRouter);
  app.use("/files", checkJwt, mediaRouter);
}else {
  app.use("/", infoRouter);
  app.use("/users", userRouter);
  app.use("/guilds", guildRouter);
  app.use("/", channelRouter);
  app.use("/channels", messageRouter);
  app.use("/files", mediaRouter);

  console.log(chalk.red("Now Working On ") + chalk.red.bold("*DEVELOP MODE*") + chalk.red(". Server ") + chalk.red.bold("*WILL NOT* ask for an authentication token."));

}

app.listen(3080,() => {
  console.log(chalk.red("░█████╗") + chalk.green("░░██████╗") + chalk.yellow("██╗░░██╗") + chalk.blue("░█████╗") + chalk.magenta("░██╗░░░██╗") + chalk.cyan("███████╗") + chalk.black("██████") + chalk.white("╗░██╗░░░██╗"))
  console.log(chalk.red("██╔══██╗")+ chalk.green("██╔════╝")  + chalk.yellow("██║░░██║") + chalk.blue("██╔══██╗") + chalk.magenta("██║░░░██║") + chalk.cyan("██╔════╝") + chalk.black("██")+ chalk.white("╔══") + chalk.black("██") + chalk.white("╗╚██╗░██╔╝"));
  console.log(chalk.red("██║░░██║")+ chalk.green("╚█████╗")  + chalk.yellow("░███████║") + chalk.blue("███████║") + chalk.magenta("╚██╗░██╔╝") + chalk.cyan("█████╗") + chalk.black("░░██████")+ chalk.white("╔╝░╚████╔╝░"));
  console.log(chalk.red("██║░░██║")+ chalk.green("░╚═══██╗")  + chalk.yellow("██╔══██║") + chalk.blue("██╔══██║") + chalk.magenta("░╚████╔╝") + chalk.cyan("░██╔══╝░░") + chalk.black("██")+ chalk.white("╔══") + chalk.black("██") + chalk.white("╗░░╚██╔╝░░"));
  console.log(chalk.red("╚█████╔╝")+ chalk.green("██████╔╝")  + chalk.yellow("██║░░██║") + chalk.blue("██║░░██║") + chalk.magenta("░░╚██╔╝░░") + chalk.cyan("███████╗") + chalk.black("██")+ chalk.white("║") + chalk.black("░░██") + chalk.white("║░░░██║░░░"));
  console.log(chalk.red("░╚════╝░")+ chalk.green("╚═════╝░")  + chalk.yellow("╚═╝░░╚═╝") + chalk.blue("╚═╝░░╚═╝") + chalk.magenta("░░░╚═╝░░░") + chalk.cyan("╚══════╝") + chalk.white("╚═╝") + chalk.black("░░") + chalk.white("╚═╝░░░╚═╝░░░"));

  console.log("\nOshavery(alpha) Revision " +  GIT_COMMIT_HASH + "\n(c) 2021 Oshavery Developers");
  logger.info("Server listening at http://localhost:3080")
});
