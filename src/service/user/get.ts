import { get } from "../../repositories/user";
import { getAccessedUser } from "./me";

export async function getUser(id: string) {
  if (id === "me") {
    return await getAccessedUser();
  }
  const res = await get(id);
  if (res === null) {
    return null;
  } else {
    return res;
  }
}
