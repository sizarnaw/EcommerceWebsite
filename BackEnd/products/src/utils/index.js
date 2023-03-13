const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const amqplib = require("amqplib");

const {
  APP_SECRET,
  ORDER_EXCHANGE,
  QUANTITY_QUEUE,
  MSG_QUEUE_URL,
} = require("../config");




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
  }
};

module.exports.CreateChannel = async () => {
  try {
    const connection = await amqplib.connect(MSG_QUEUE_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(ORDER_EXCHANGE, 'direct', { durable: true });
    await channel.assertQueue(QUANTITY_QUEUE, { durable: true });
    return channel;
  } catch (err) {
    throw err;
  }
};


module.exports.SubscribeEvent = async ( channel, service ) => {
  console.log(` Quantity queue Ready to Receive msgs`);

  channel.bindQueue(QUANTITY_QUEUE, ORDER_EXCHANGE, "QUANTITY");

  channel.consume(QUANTITY_QUEUE,
    (msg) => {
      if (msg.content) {
        console.log("FROM SHOPPING MS: the message is:", msg.content.toString());
        service.SubscribeEvents(msg.content.toString());
      }
    },
    {
      noAck: true,
    }
  );
  }