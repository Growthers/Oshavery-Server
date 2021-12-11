import { verifyToken } from "./jwt";

// トークンが正しいものであればtrueを返す
export async function loginCheck(token: string): Promise<boolean> {
  const res = await verifyToken(token);
  if (res == null) {
    return false;
  } else {
    return true;
  }
}
