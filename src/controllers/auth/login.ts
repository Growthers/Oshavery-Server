import { FastifyInstance } from "fastify";
import { AuthHeaders, AuthQueryString, Token } from "../../types/auth_types";
import bcrypt from "bcrypt";
import { users } from "../../models/user";
import jwt from "jsonwebtoken";

export async function Login(server: FastifyInstance) {
  server.post<{
    Body: AuthQueryString;
    Headers: AuthHeaders;
    Reply: Token | string;
  }>("/login", async (req, res) => {
    const { username, password } = req.body;
    const userdata = await users.getFromSub(username);
    const password_collect = await bcrypt.compare(password, userdata.password);

    if (password_collect) {
      const responseData = {
        uid: userdata.id,
        uname: userdata.name,
      };

      const reply: Token = {
        token: jwt.sign(responseData, "123"),
      };
      res.status(201).send(reply);
    } else {
      res.status(400).send("Invalid request");
    }
  });
}
