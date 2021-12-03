import { updateGuild } from "../../repositories/guild";

export default async function (
  guildId: string,
  body: { name: string; icon: string; owner: string }
) {
  // Done: データとってくる
  const res = await updateGuild(guildId, body);
  if (!res) {
    return null;
  } else {
    return res;
  }
}
