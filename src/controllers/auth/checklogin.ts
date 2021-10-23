import { InvalidTokenError, verifyToken } from "./verifytoken";

export async function checklogin(token: string) {
  if (!token) {
    return;
  }
  const checkToken = await verifyToken(token);
  if (checkToken instanceof InvalidTokenError) {
    return new InvalidTokenError();
  }
  return checkToken;
}
