const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passportConfig = require("./config/passport");
const passport = require("passport");
const cookieSession = require("cookie-session");
const path = require("path");
const keys = require("./config/keys");

const users = require("./routes/api/user");
const scoremanager = require("./routes/api/scoremanager");

const db = require("./config/keys").mongoDB.mongoURI;

const app = express();

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connecting to mongoDB
mongoose
  .connect(db)
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

app.use(passport.session());

//enabling CORS
app.use(cors());

app.use("/api/user", users);
app.use("/api/score", scoremanager);

app.get("/", (req, res) => {
  res.send("<h1>Server Says Hiii.....</h1>");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("Game/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Game", "build", "index.html"));
  });
}
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running on port ===>> ${port}`));
