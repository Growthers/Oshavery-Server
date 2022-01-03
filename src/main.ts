import fastify from "fastify";
import cors from "fastify-cors";
import Log4js from "log4js";
import dotenv from "dotenv";
import chalk from "chalk";
import { MainRouting } from "./routes/main";
import process from "process";

export function build(options = {}) {
  const app = fastify(options).register(cors);
  MainRouting(app);
  return app;
}

export const Server = build({
  logger: {
    level: "info",
    prettyPrint: true,
  },
});

const { GIT_COMMIT_HASH } = process.env;

Log4js.configure("log-config.json");
export const logger = Log4js.getLogger("system");
dotenv.config();

console.log(chalk.red("Now Working On ") + chalk.red.bold("*DEVELOP MODE*"));

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
