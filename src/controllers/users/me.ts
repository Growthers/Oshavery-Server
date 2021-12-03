import { FastifyReply } from "fastify";
import { getAccessedUser } from "../../service/user/me";

type me = {
  id: string;
  name: string;
  avatarurl: string;
  bot: boolean;
  state: number;
  // eslint-disable-next-line
  guilds: any;
};

// eslint-disable-next-line
export async function getMe(_req: any, res: FastifyReply) {
  const resp = await getAccessedUser();
  if (resp !== null) {
    const response_data: me = {
      id: resp.id,
      name: resp.name,
      avatarurl: resp.avatarurl,
      bot: resp.bot,
      state: 0,
      guilds: resp.guilds,
    };

    return res.status(200).send(response_data);
  } else {
    return res.status(400).send("Invalid Request");
  }
}
