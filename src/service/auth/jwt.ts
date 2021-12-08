import jsonwebtoken, { JwtPayload, verify } from "jsonwebtoken";
export async function genJWTAuthToken(data: { id: string }) {
  const payload = {
    id: data.id,
  };
  return jsonwebtoken.sign(payload, "SECRET", { expiresIn: "2days" });
}

export async function verifyToken(token: string) {
  let v: JwtPayload | string = "";
  try {
    v = verify(token, "SECRET");
  } catch {
    return null;
  }
  return v;
}
