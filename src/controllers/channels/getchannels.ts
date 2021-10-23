import { FastifyReply, FastifyRequest } from "fastify";
import { channels, GuildNotFoundError } from "../../models/channel.js";
import { Channel, ChannelIdParams } from "../../types/channel_types.js";
import { Server, IncomingMessage, ServerResponse } from "http";
import { AuthHeaders } from "../../types/auth_types";
import { checklogin } from "../auth/checklogin";
import { InvalidTokenError } from "../auth/verifytoken";

export async function getChannels(
  req: FastifyRequest<
    { Body: Channel; Params: ChannelIdParams; Headers: AuthHeaders },
    Server,
    IncomingMessage
  >,
  res: FastifyReply<Server, IncomingMessage, ServerResponse, { Body: Channel }>
) {
  if (!req.headers.authorization) return;
  const check = await checklogin(req.headers.authorization);
  if (check instanceof InvalidTokenError) {
    res.status(401).send("Invalid request");
    return;
  }

  const guild_id = req.params.guildId;

  const guilds = await channels.get(guild_id);
  if (guilds instanceof GuildNotFoundError) {
    return res.status(404).send("Not found");
  }
  return res.status(200).send(guilds);
}
