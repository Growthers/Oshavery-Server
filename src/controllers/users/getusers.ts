import axios from "axios";
import express from "express";
import { users } from "../../models/user";
import { conf , logger} from "../../main";
import {getMe} from "./me";
conf;

export async function getAllUsers(req: express.Request, res: express.Response) {
  console.log(req.path);
  return await users.getAllUsers().then((r) => { return res.status(200).json(r) }).catch((e) => { return console.log(e); })
}

export async function getUsers(req: express.Request, res: express.Response) {
  if (req.path === "/me") { await getMe(req, res); return; }

  const user_id = req.params.userId;

  await users.get(user_id)
    .then((ur) => {
      res.status(200).json(ur);
      return;
    })
    .catch((e) => {
      logger.error(e);
      res.status(404).send("User Not Found");
      return;
    });
  return;
}
