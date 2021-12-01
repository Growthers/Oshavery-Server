import { FastifyRequest, FastifyReply } from "fastify";
import { users } from "../../repositories/user";
import { userIdParams } from "../../types/user_types";
import { getUser } from "../../service/user/get";

export async function getAllUsers(_req: FastifyRequest, res: FastifyReply) {
  return users
    .getAllUsers()
    .then((r) => res.status(200).send(r))
    .catch((e) => console.log(e));
}

export async function getUsers(
  req: FastifyRequest<{ Params: userIdParams }>,
  res: FastifyReply
) {
  const user_id = req.params.id;
  const resp = await getUser(user_id);
  if (resp !== null) {
    return res.status(200).send(resp);
  } else {
    req.log.error("User Not Found");
    return res.status(404).send("User Not Found");
  }
}
