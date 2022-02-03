import { revokeUserToken } from "../../repositories/auth";

export async function logout(token: string) {
  const Token = token.split(" ")[1];
  if (!Token) return undefined;
  const res = await revokeUserToken(Token);
  return res;
}
