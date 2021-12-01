import { getFromSub, updateUser } from "../../repositories/user";

export async function updateAccessedUserData(name: string) {
  const user = await getFromSub("oshavery|1");
  if (!user) {
    return null;
  } else {
    const updated = await updateUser(user.id, name);
    if (updated !== null) {
      return updated;
    } else {
      return null;
    }
  }
}
