import { FastifyReply, FastifyRequest } from "fastify";
import { GuildIdParam } from "../../types/guild_types";
import { deleteGuild as dG } from "../../service/guild/delete";

export async function deleteGuild(
  req: FastifyRequest<{ Params: GuildIdParam }>,
  res: FastifyReply
) {
  const resp = await dG(req.params.guildId);

  if (resp !== null) {
    return res.status(204).send();
  } else {
    req.log.error("Failed to Delete Guild");
    return res.status(400).send("Invalid Request");
  }
}
