import { get } from "../../repositories/info";

export async function getInstanceInfo() {
  const res = await get();
  if (res !== null) {
    return res;
  } else {
    return null;
  }
}
