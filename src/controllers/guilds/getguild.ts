import { FastifyReply, FastifyRequest } from "fastify";
import getOneGuild from "../../service/guild/get";
import { GuildIdParam } from "../../types/guild_types";
import { Server } from "https";
import { IncomingMessage } from "http";

export async function getGuild(
  req: FastifyRequest<{ Params: GuildIdParam }, Server, IncomingMessage>,
  res: FastifyReply
) {
  const resp = await getOneGuild(req.params.guildId);

  if (resp !== null) {
    return res.status(200).send(resp);
  } else {
    res.log.error("Guild Not Found");
    return res.status(400).send("Guild Not Found");
  }
}
