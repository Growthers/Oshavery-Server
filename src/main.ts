import fastify from "fastify";
import cors from "fastify-cors";
import Log4js from "log4js";
import dotenv from "dotenv";
import "./util";
import "./repositories/main";
import { MainRouting } from "./routes/main";
import { ShowStartMessage } from "./util";

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

Log4js.configure("log-config.json");
export const logger = Log4js.getLogger("system");
dotenv.config();

Server.listen(3080, () => {
  ShowStartMessage();
});
