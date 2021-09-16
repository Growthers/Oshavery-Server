import axios from "axios";
import express from "express";
import { users, register } from "../models/user";
import {conf} from "../main";

conf;

export const userController = {
  async getAllUsers(req: express.Request, res: express.Response){
    console.log(req.path);
    return await users.getAllUsers().then((r) => {return res.status(200).json(r)}).catch((e) => {return console.log(e);})
  },

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
  },

  async register(req: express.Request, res: express.Response){
    const accessToken = req.headers.authorization;
    console.log(process.env.AUTH0_DOMAIN + "/userinfo")
    const response = await axios("https://" + process.env.AUTH0_DOMAIN + "/userinfo" || "", {
    method: "GET",
    headers: {
      Authorization: accessToken,
    }
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

    console.table(response);

    const data:register = {
      name: response.name,
      sub: response.sub,
      avatar: response.picture
    }

    await users.createUserAccount(data)
    .then((r) => {return res.status(201).json(r);})
    .catch((e) => {console.error(e); return res.status(400).send("Invalid request");});

    return;
  }
}
