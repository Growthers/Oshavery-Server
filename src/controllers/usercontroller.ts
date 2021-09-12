import express from "express";
import { users } from "../models/user";

export const userController = {
  async getUsers(req: express.Request, res: express.Response) {
    console.log(req.path);
    const user_id = req.params.userId;

    await users.get(user_id)
    .then((ur) => {
      console.log(ur);
      res.status(200).json(ur);
      return;
    })
    .catch((e) => {
      console.error(e);
      res.status(404).send("User Not Found");
      return;
    });
    return;
  }
}
