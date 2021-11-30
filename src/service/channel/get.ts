import { channels, GuildNotFoundError } from "../../models/channel";

export default async function (id: string) {
  const guilds = await channels.get(id);

  if (guilds instanceof GuildNotFoundError) {
    throw Error("Guild Not Found");
  }

  return guilds;
}
