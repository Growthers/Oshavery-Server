import jsonwebtoken, { JwtPayload, verify } from "jsonwebtoken";
import { checkUserTokenNotRevoked } from "../../repositories/auth";

export const Secret = "";

export async function genJWTAuthToken(data: { id: string }) {
  const payload = {
    id: data.id,
  };
  return jsonwebtoken.sign(payload, Secret, { expiresIn: "2days" });
}

export async function verifyToken(token: string) {
  let v: JwtPayload | string = "";
  try {
    v = verify(token, Secret);
  } catch (e) {
    return null;
  }
  const res = await checkUserTokenNotRevoked(token);
  if (res) {
    return v;
  } else {
    return null;
  }
}
