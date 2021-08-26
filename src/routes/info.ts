import express from "express";
const router_info = express.Router();

router_info.route("/version")
  .get(() => {console.log("げっとうえー")})

router_info.route("/server-info")
  .get(() => {console.log("げっとうえー")})
  .post(() => {console.log("ぽすとうえー")})
  .patch(() => {console.log("ぱっちうえー")})

module.exports = router_info;
