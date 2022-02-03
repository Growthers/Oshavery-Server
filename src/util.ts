import chalk from "chalk";
import process from "process";
import { prisma } from "./repositories/client";

export function ShowStartMessage() {
  const { GIT_COMMIT_HASH } = process.env;
  console.log(chalk.red("Now Working On ") + chalk.red.bold("*DEVELOP MODE*"));
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
}

process.on("SIGTERM", async () => {
  console.log("サーバーを終了しています...");
  await prisma.$disconnect();
  console.log("終了");
  process.exit(0);
});
process.on("SIGINT", async () => {
  console.log("サーバーを終了しています...");
  await prisma.$disconnect();
  console.log("終了");
  process.exit(0);
});
