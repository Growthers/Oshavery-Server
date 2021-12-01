import { getAllUsers as getUsers } from "../../repositories/user";

export async function getAllUsers() {
  const allUser = await getUsers();
  if (allUser !== null) {
    return allUser;
  } else {
    return null;
  }
}
