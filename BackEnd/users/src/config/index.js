const dotEnv = require("dotenv");


  dotEnv.config();


module.exports = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  APP_SECRET: process.env.APP_SECRET,
};