const router_user = require("express").Router();

router_user.route("/")
  .get(() => {console.log("げっとうえー")})
  .post(() => {console.log("ぽすとうえー")})

router_user.route("/:userId")
  .get(() => {console.log("げっとうえー")})
  .patch(() => {console.log("ぱっちうえー")})

router_user.route("/me")
  .get(() => {console.log("げっとうえー")})
  .patch(() => {console.log("ぱっちうえー")})

module.exports = router_user;
