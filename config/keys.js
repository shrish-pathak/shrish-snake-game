if (process.env.NODE_ENV === "production") {
  module.exports = require("./keysProdEnv");
} else {
  module.exports = require("./keysDevEnv");
}
