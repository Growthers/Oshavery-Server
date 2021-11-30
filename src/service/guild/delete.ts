import { deleteGuild as dG } from "../../repositories/guild";

export async function deleteGuild(id: string) {
  const res = await dG(id);
  if (!res) {
    return null;
  } else {
    return res;
  }
}
