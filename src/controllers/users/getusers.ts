import { FastifyRequest, FastifyReply } from "fastify";
import { getAllUsers as allUsers } from "../../service/user/allusers";
import { userIdParams } from "../../types/user_types";
import { getUser } from "../../service/user/get";

export async function getAllUsers(_req: FastifyRequest, res: FastifyReply) {
  const users = allUsers();
  if (users === null) {
    return res.status(400).send("Invalid Request");
  } else {
    return res.status(200).send(users);
  }
}

export async function getUsers(
  req: FastifyRequest<{ Params: userIdParams }>,
  res: FastifyReply
) {
  const user_id = req.params.userId;
  const resp = await getUser(user_id);
  if (resp !== null) {
    return res.status(200).send(resp);
  } else {
    req.log.error("User Not Found");
    return res.status(404).send("User Not Found");
  }
}
