import { FastifyInstance } from "fastify";
import { InstanceInfoRouter } from "./info";
import { ChannelRouter } from "./channel";
import { MediaRouter } from "./media";
import { UserRouter } from "./user";
import { GuildRouter } from "./guild";
import { MessageRouter } from "./message";
import { loginCheck } from "../service/auth/logincheck";
import { AuthRouter } from "./auth";

export async function MainRouting(server: FastifyInstance) {
  server.addHook("onRequest", async (req, res) => {
    if (ExcludeRoutes.includes(req.routerPath)) {
      return;
    }
    let token = req.headers.authorization;

    if (!token) {
      return res.status(400).send("No Token");
    }

    if (token.split(" ")[0] === "Bearer") {
      token = token.split(" ")[1];
    } else {
      return res.status(401).send("Unauthorized");
    }
    const check = await loginCheck(token);
    if (!check) {
      req.log.error("Invalid Token");
      return res.status(401).send("Unauthorized");
    } else {
      return;
    }
  });

  await InstanceInfoRouter(server);
  await ChannelRouter(server);
  await MediaRouter(server);
  await MessageRouter(server);
  await UserRouter(server);
  await GuildRouter(server);
  await AuthRouter(server);
}

// 認証が必要*ない*ルートの配列(絶対パス
const ExcludeRoutes = ["/server-info", "/version", "/login"];
