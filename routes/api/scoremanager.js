const express = require("express");
const router = express.Router();

const User = require("../../models/User");

//@route GET api/score
//@desc get user score
//@access Public
router.get("/", (req, res) => {
  User.find({}, { username: 1, score: 1, _id: 0 })
    .then(players => {
      //console.log(players);
      if (players.length === 0) {
        return res.status(404).json({ error: "no one has yet set any score" });
      }
      res.json(players);
    })
    .catch(err => {
      res.status(404).json({ players: "there are no player" });
    });
});

//@route GET api/score/update
//@desc update user score
//@access Public
router.post("/update", (req, res) => {
  const updateScore = {};
  updateScore.score = req.body.score;

  if (!req.user) {
    res.send("not in");
  } else {
    User.findOne({ username: req.user.username })
      .then(usersList => {
        //console.log(usersList);
        if (updateScore.score > usersList.score) {
          //console.log("new high score");
          User.findOneAndUpdate(
            { username: req.user.username },
            { $set: updateScore },
            { new: true }
          ).then(user => {
            res.json({ msg: "score updated Successfully" });
          });
        } else {
          // console.log(usersList.score);
        }
      })
      .catch(err => console.log(err));
  }
});
module.exports = router;
