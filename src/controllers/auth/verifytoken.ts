import jwt, { JwtPayload } from "jsonwebtoken";
import { logger } from "../../main";
import * as fs from "fs";
import { loadConfig } from "../../config/load";
export class InvalidTokenError extends Error {}

const Config = loadConfig();
const publicKey = fs.readFileSync(Config.publicKeyFilePath);
export async function verifyToken(
  token: string
): Promise<InvalidTokenError | JwtPayload | string> {
  try {
    return jwt.verify(token, publicKey);
  } catch (e) {
    logger.error("authentication failed");
    return new InvalidTokenError();
  }
}
