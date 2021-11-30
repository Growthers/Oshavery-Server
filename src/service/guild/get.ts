import { get as getGuild } from "../../repositories/guild";
import { searchGuildIcon } from "../../repositories/media";

export default async function getOneGuild(id: string) {
  const guild = await getGuild(id);
  if (guild !== null) {
    const icon = await searchGuildIcon(guild.id);

    if (icon) {
      return {
        id: guild.id,
        name: guild.name,
        icon: icon.fullpath,
        topic: guild.topic || "",
        created_at: guild.created_at,
      };
    } else {
      return {
        id: guild.id,
        name: guild.name,
        icon: guild.icon,
        topic: guild.topic || "",
        created_at: guild.created_at,
      };
    }
  } else {
    return null;
  }
}
