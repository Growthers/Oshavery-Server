import { getMedia as getMedia } from "../../repositories/media";

export default async function get(id: string) {
  const media = getMedia(id);
  if (media !== null) {
    return media;
  } else {
    return null;
  }
}
