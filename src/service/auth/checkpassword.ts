import bcrypt from "bcrypt";
export async function checkLoginPassword(data: {
  raw: string;
  encoded: string;
}) {
  return await bcrypt.compare(data.raw, data.encoded);
}
