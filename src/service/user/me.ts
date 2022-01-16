import { get as getUser } from "../../repositories/user";
import { get, searchJoinedGuilds } from "../../repositories/guild";

export type Guilds = {
  id: string;
  name: string;
  topic: string | null;
  icon: string;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
};

export async function getAccessedUser() {
  // ToDo: ここが決め打ちになっているので修正する
  const id = "00000000-0000-0000-0000-000000000000";
  const userdata = await getUser(id);
  if (userdata === null) {
    return null;
  }
  /*
   * ユーザーが参加しているギルドのリストを取得->ギルドID
   * */
  const userJoinedGuilds = await searchJoinedGuilds(userdata.id);
  if (userJoinedGuilds.length === 0) {
    return null;
  }
  const userJoinedGuildsDatas: Array<Guilds> = [];
  // eslint-disable-next-line
  for (let i in userJoinedGuilds) {
    const tmp = await get(userJoinedGuilds[i].guild_id || "");
    if (tmp === null) {
      return null;
    }
    userJoinedGuildsDatas.push(tmp);
  }

  return {
    id: userdata.id,
    name: userdata.name,
    avatarurl: userdata.avatarurl,
    bot: userdata.bot,
    state: 0,
    guilds: userJoinedGuildsDatas,
  };
}
