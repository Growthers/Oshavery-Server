import { deleteMessage } from "../../repositories/message";
import { messageDeleted } from "../../controllers/notificationcontroller";

export default async function deleteMes(id: string) {
  const date: Date = new Date();
  const res = await deleteMessage(id, date);
  if (res !== null) {
    await messageDeleted(res.channel_id, res.id);
    return res;
  } else {
    return null;
  }
}
