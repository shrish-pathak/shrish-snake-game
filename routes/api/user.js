const express = require("express");
const router = express.Router();
const passport = require("passport");

//@route GET api/user/
//@desc test route
//@access Public
router.get("/", (req, res) => {
  res.json({ msg: "welcome to home page" });
});

//@route GET api/user/logindetail
//@desc provides username
//@access Public
router.get("/logindetail", (req, res) => {
  if (req.user) {
    const username = req.user.username;

    res.json({ name: username });
  } else {
    res.json({ msg: "not logged in" });
  }
});

//@route GET api/user/logout
//@desc logout user
//@access public
router.get("/logout", (req, res) => {
  req.logout();

  res.redirect("https://accounts.google.com/logout");
});

//@route GET api/user/google
//@desc login user
//@access Public
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

//@route GET api/user/redirect
//@desc redirect user if authenticated
//@access private
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  //res.json(req.user);
  res.redirect("https://shrish-snake-game.herokuapp.com/start");
});

module.exports = router;
