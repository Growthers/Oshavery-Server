import { FastifyReply, FastifyRequest } from "fastify";
import { Server } from "https";
import { IncomingMessage } from "http";
import { Login } from "../../service/auth/login";
import { loginBody } from "../../types/auth_types";

export async function loginHandler(
  req: FastifyRequest<{ Body: loginBody }, Server, IncomingMessage>,
  res: FastifyReply
) {
  const body = req.body;

  const resp = await Login({ id: body.id, password: body.password });
  if (resp !== null) {
    const r = {
      token: resp,
    };

    return res.status(201).send(r);
  } else {
    res.log.error("Login failed");
    return res.status(400).send("Login Failed");
  }
}
