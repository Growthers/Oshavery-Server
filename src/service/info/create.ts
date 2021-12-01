import { create as createInstanceInfo } from "../../repositories/info";
export async function CreateInstanceInfo(data: {
  name: string;
  admin: { account: string; mail: string };
  tos: string;
  policy: string;
}) {
  const info = await createInstanceInfo(data);
  if (info === null) {
    return null;
  } else {
    return info;
  }
}
