import { verifyToken } from "./jwt";

export async function loginCheck(token: string): Promise<boolean> {
  const res = await verifyToken(token);
  if (res === null) {
    return false;
  } else {
    return true;
  }
}
