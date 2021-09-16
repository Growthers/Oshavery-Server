import express from "express";
import { userController } from "../controllers/usercontroller";
const router_user = express.Router();

router_user.route("/")
  .get(userController.getAllUsers)
  .post(() => {console.log("ぽすとうえー")});

router_user.route("/:userId")
  .get(userController.getUsers)
  .patch(() => {console.log("ぱっちうえー")})

router_user.route("/me")
  .get(() => {console.log("げっとうえー")})
  .patch(() => {console.log("ぱっちうえー")})

module.exports = router_user;
