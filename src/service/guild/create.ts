import { createGuild } from "../../repositories/guild";

export default async function (data: { name: string; topics: string }) {
  const res = await createGuild({ name: data.name, topics: data.topics });
  if (!res) {
    return null;
  } else {
    return res;
  }
}
