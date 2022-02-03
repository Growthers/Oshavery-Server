import { getUserByID as getUser } from "../../repositories/user";
import { checkLoginPassword } from "./checkpassword";
import { genJWTAuthToken } from "./jwt";

export async function Login(data: { id: string; password: string }) {
  const user = await getUser(data.id);
  if (user === null) {
    return null;
  }
  if (
    await checkLoginPassword({ raw: data.password, encoded: user.password })
  ) {
    return await genJWTAuthToken({ id: user.id });
  } else {
    return null;
  }
}
