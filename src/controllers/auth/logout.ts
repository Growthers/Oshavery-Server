import { logout } from "../../service/auth/logout";
import { FastifyReply, FastifyRequest } from "fastify";

export async function logoutHandler(req: FastifyRequest, res: FastifyReply) {
  // MainRouterでトークンが正常に取得できない場合はエラーになるのでnullチェックはしない
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await logout(req.headers.authorization);
  return res.status(204).send("");
}
