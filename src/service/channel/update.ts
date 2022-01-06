import { updateChannel } from "../../repositories/channel";

export default function (data: {
  id: string;
  name: string;
  topic: string;
  position: number;
}) {
  const res = updateChannel(data);
  if (!res) {
    return undefined;
  } else {
    return res;
  }
}
