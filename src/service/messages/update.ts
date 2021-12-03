import { updateMessage as updateMes } from "../../repositories/message";
import { messageUpdated } from "../../controllers/notificationcontroller";

export default async function (id: string, content: string) {
  const res = await updateMes(id, content);
  if (!res) {
    return null;
  }
  // ws
  await messageUpdated(res.channel_id, res.id);
  return res;
}
