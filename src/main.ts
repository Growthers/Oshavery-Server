import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { Server as httpServer, IncomingMessage, ServerResponse } from "http";
import cors from "fastify-cors";
import Log4js from "log4js";
import dotenv from "dotenv";
import chalk from "chalk";
import { MainRouting } from "./routes/main";

export const Server: FastifyInstance<
  httpServer,
  IncomingMessage,
  ServerResponse
> = fastify({
  logger: true,
});

const { GIT_COMMIT_HASH } = process.env;
Log4js.configure("log-config.json");
export const logger = Log4js.getLogger("system");
dotenv.config();

MainRouting(Server);

console.log(
  chalk.red("Now Working On ") +
    chalk.red.bold("*DEVELOP MODE*") +
    chalk.red(". Server ") +
    chalk.red.bold("*WILL NOT* ask for an authentication token.")
);

Server.listen(3080, async () => {
  console.log(
    chalk.red("░█████╗") +
      chalk.green("░░██████╗") +
      chalk.yellow("██╗░░██╗") +
      chalk.blue("░█████╗") +
      chalk.magenta("░██╗░░░██╗") +
      chalk.cyan("███████╗") +
      chalk.black("██████") +
      chalk.white("╗░██╗░░░██╗")
  );
  console.log(
    chalk.red("██╔══██╗") +
      chalk.green("██╔════╝") +
      chalk.yellow("██║░░██║") +
      chalk.blue("██╔══██╗") +
      chalk.magenta("██║░░░██║") +
      chalk.cyan("██╔════╝") +
      chalk.black("██") +
      chalk.white("╔══") +
      chalk.black("██") +
      chalk.white("╗╚██╗░██╔╝")
  );
  console.log(
    chalk.red("██║░░██║") +
      chalk.green("╚█████╗") +
      chalk.yellow("░███████║") +
      chalk.blue("███████║") +
      chalk.magenta("╚██╗░██╔╝") +
      chalk.cyan("█████╗") +
      chalk.black("░░██████") +
      chalk.white("╔╝░╚████╔╝░")
  );
  console.log(
    chalk.red("██║░░██║") +
      chalk.green("░╚═══██╗") +
      chalk.yellow("██╔══██║") +
      chalk.blue("██╔══██║") +
      chalk.magenta("░╚████╔╝") +
      chalk.cyan("░██╔══╝░░") +
      chalk.black("██") +
      chalk.white("╔══") +
      chalk.black("██") +
      chalk.white("╗░░╚██╔╝░░")
  );
  console.log(
    chalk.red("╚█████╔╝") +
      chalk.green("██████╔╝") +
      chalk.yellow("██║░░██║") +
      chalk.blue("██║░░██║") +
      chalk.magenta("░░╚██╔╝░░") +
      chalk.cyan("███████╗") +
      chalk.black("██") +
      chalk.white("║") +
      chalk.black("░░██") +
      chalk.white("║░░░██║░░░")
  );
  console.log(
    chalk.red("░╚════╝░") +
      chalk.green("╚═════╝░") +
      chalk.yellow("╚═╝░░╚═╝") +
      chalk.blue("╚═╝░░╚═╝") +
      chalk.magenta("░░░╚═╝░░░") +
      chalk.cyan("╚══════╝") +
      chalk.white("╚═╝") +
      chalk.black("░░") +
      chalk.white("╚═╝░░░╚═╝░░░")
  );

  console.log(
    `\nOshavery(alpha) Revision ${GIT_COMMIT_HASH}\n(c) 2021 Oshavery Developers`
  );
});
