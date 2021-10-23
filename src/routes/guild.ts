import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { memberList } from "../controllers/guilds/memberlist.js";
import { createGuild } from "../controllers/guilds/createguild.js";
import { getGuild } from "../controllers/guilds/getguild.js";
import { updateGuild } from "../controllers/guilds/updateguild.js";
import { deleteGuild } from "../controllers/guilds/deleteguild.js";
import {
  CreateGuild,
  GetGuild,
  GuildIdParam,
  UpdateGuildInfo,
} from "../types/guild_types.js";
import { User } from "../types/user_types.js";
import { AuthHeaders } from "../types/auth_types";

export async function GuildRouter(server: FastifyInstance) {
  const GuildReturnObjectSchema: RouteShorthandOptions = {
    schema: {
      body: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          topic: { type: "string" },
          icon: { type: "string" },
          owner_id: { type: "string" },
          users: { type: "array" },
          channels: { type: "array" },
        },
      },
    },
  };

  const UpdateGuildInformationObjectSchema: RouteShorthandOptions = {
    schema: {
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
          icon: { type: "string" },
          topic: { type: "string" },
          owner_id: { type: "string" },
        },
      },
    },
  };

  server.post<{
    Body: CreateGuild;
    Params: GuildIdParam;
    Reply: GetGuild;
    Headers: AuthHeaders;
  }>("/guilds", GuildReturnObjectSchema, createGuild);

  server.get<{ Params: GuildIdParam; Headers: AuthHeaders }>(
    "/guilds/:guildId",
    getGuild
  );

  server
    .patch<{
      Body: UpdateGuildInfo;
      Params: GuildIdParam;
      Headers: AuthHeaders;
    }>("/guilds/:guildId", UpdateGuildInformationObjectSchema, updateGuild)
    .delete<{ Params: GuildIdParam; Headers: AuthHeaders }>(
      "/guilds/:guildId",
      deleteGuild
    );

  // router_guild.route("/:guildId/roles") ToDo: ロールの実装
  //   .get(() => {console.log("げっとうえー")})
  //   .post(() => {console.log("ぽすとうえー")})
  //   .patch(() => {console.log("ぱっちうえー")})
  //   .delete(() => {console.log("でりーとうえー")})

  server.get<{
    Params: GuildIdParam;
    Reply: Array<User>;
    Headers: AuthHeaders;
  }>("/guilds/:guildId/members", memberList);

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
