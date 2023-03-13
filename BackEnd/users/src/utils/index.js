const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const amqplib = require("amqplib");

const {
  APP_SECRET,
} = require("../config");



module.exports.ValidatePassword = async (
  enteredPassword,
  savedPassword
) => {
  return (await bcrypt.hash(enteredPassword, 10)) === savedPassword;
};

module.exports.GenerateSignature = async (payload) => {
  try {
    return await jwt.sign(payload, APP_SECRET, { expiresIn: "30d" });
  } catch (error) {
    console.log(error);
    return error;
  }
};
module.exports.ValidateSignature = async (req) => {
  try {
    const signature = req.get("Authorization");
    const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
    req.user = payload;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports.FormatResponse = (data) => {
  if (data) {
    return { data };
  } else {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@")
    console.log("         ERROR          ")
    console.log("@@@@@@@@@@@@@@@@@@@@@@@")
    return {};
  }
};
