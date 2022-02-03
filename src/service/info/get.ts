import { getInstanceInfoFromDB } from "../../repositories/info";

export async function getInstanceInfo() {
  const res = await getInstanceInfoFromDB();
  if (res !== null) {
    return res;
  } else {
    return null;
  }
}
