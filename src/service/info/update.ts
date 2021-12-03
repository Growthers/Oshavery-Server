import { update } from "../../repositories/info";

export async function updateInstanceInfo(data: {
  name: string;
  admin: { account: string; mail: string };
  tos: string;
  policy: string;
}) {
  const res = await update(data);
  if (res !== null) {
    return res;
  } else {
    return null;
  }
}
