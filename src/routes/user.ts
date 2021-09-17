import express from "express";
import { userController } from "../controllers/usercontroller";
const router_user = express.Router();

router_user.route("/")
  .get(userController.getAllUsers)
  .post(userController.register);

router_user.route("/:userId")
  .get(userController.getUsers)
  .patch(userController.updateUser)

module.exports = router_user;
