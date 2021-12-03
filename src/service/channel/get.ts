import { getChannels } from "../../repositories/channel";

export default async function (id: string) {
  return await getChannels(id);
}
