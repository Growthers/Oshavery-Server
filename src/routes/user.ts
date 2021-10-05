import express from "express";
import {getAllUsers} from "../controllers/users/getusers";
import {register} from "../controllers/users/register";
import {getUsers} from "../controllers/users/getusers";
import {updateUser} from "../controllers/users/updateuser";
const router_user = express.Router();

router_user.route("/")
  .get(getAllUsers)
  .post(register);

router_user.route("/:userId")
  .get(getUsers)
  .patch(updateUser)

module.exports = router_user;
