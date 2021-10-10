import {FastifyInstance} from "fastify";
import { memberList } from "../controllers/guilds/memberlist";
import {createGuild} from "../controllers/guilds/createguild";
import {getGuild} from "../controllers/guilds/getguild";
import {updateGuild} from "../controllers/guilds/updateguild";
import {deleteGuild} from "../controllers/guilds/deleteguild";


export async function GuildRouter(server: FastifyInstance){
  server.post("/guilds",createGuild);

  server.get("/guilds/:guildId",getGuild)
    .patch("/guilds/:guildId",updateGuild)
    .delete("/guilds/:guildId",deleteGuild);

  // router_guild.route("/:guildId/roles") ToDo: ロールの実装
  //   .get(() => {console.log("げっとうえー")})
  //   .post(() => {console.log("ぽすとうえー")})
  //   .patch(() => {console.log("ぱっちうえー")})
  //   .delete(() => {console.log("でりーとうえー")})

  server.get("/guilds/:guildId/members", memberList)

  // router_guild.route("/:guildId/members/:userId") ToDo: ギルドの特定ユーザー情報取得関連の実装
  //   .get(() => {console.log("げっとうえー")})
  //   .put(() => {console.log("ぷっとうえー")})
  //   .delete(() => {console.log("でりーとうえー")})
  // ToDo: 招待の実装
  // router_guild.route("/:guildId/invites")
  //   .get(() => {console.log("げっとうえー")})
  //   .post(() => {console.log("ぽすとうえー")})
  //
  // router_guild.route("/:guildId/invites/:inviteId")
  //   .put(() => {console.log("ぷっとうえー")})
  //   .delete(() => {console.log("でりーとうえー")})

}


