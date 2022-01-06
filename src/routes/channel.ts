import { FastifyInstance } from "fastify";
import {
  createChannel,
  updateChannel,
} from "../controllers/channels/channelcontroler";
import { getChannels } from "../controllers/channels/channelcontroler";
import { GuildIdParam } from "../types/guild_types";
import { CreateChannel, UpdateChannel } from "../types/channel_types";

export async function ChannelRouter(server: FastifyInstance) {
  await server.get<{ Params: GuildIdParam }>(
    "/guilds/:guildId/channels",
    getChannels
  );
  await server.post<{ Params: GuildIdParam; Body: CreateChannel }>(
    "/guilds/:guildId/channels",
    createChannel
  );

  await server.post<{ Params: GuildIdParam; Body: UpdateChannel }>(
    "/guilds/:guildId/channels",
    updateChannel
  );

  // チャンネルの更新の実装;

  // router_channel.route("/channels/:channelId/permissions") ToDo: チャンネル権限の追加
  //   .get(() => {console.log("げっとうえー")})
  //   .post(() => {console.log("ぽすとうえー")})
  //   .put(() => {console.log("ぷっとうえー")})
  //   .delete(() => {console.log("でりーとうえー")});
}
