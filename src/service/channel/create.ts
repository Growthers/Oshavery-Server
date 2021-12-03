import { channelCreated } from "../../controllers/notificationcontroller";
import { createChannel } from "../../repositories/channel";

export default async function (data: {
  name: string;
  topics: string;
  type: string;
  position: number;
  guildId: string;
}) {
  const res = await createChannel({
    name: data.name,
    topics: data.topics,
    type: data.type,
    position: data.position,
    guildId: data.guildId,
  });

  // 通知
  await channelCreated(res.id);

  return res;
}
