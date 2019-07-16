module.exports = {
  mongoDB: {
    mongoURI: process.env.MONGO_URI
  },
  google: {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  },
  session: {
    cookieKey: process.env.COOKIE_KEY
  }
};
