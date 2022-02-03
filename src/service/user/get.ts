import { getUserByID } from "../../repositories/user";
import { getAccessedUser } from "./me";

export async function getUser(id: string) {
  if (id === "me") {
    return await getAccessedUser();
  } else {
    const res = await getUserByID(id);
    if (res === null) {
      return null;
    } else {
      return res;
    }
  }
}
