const jwt = require("jsonwebtoken");
const Axios = require("axios");
const amqplib = require("amqplib");

const {
  APP_SECRET,
  CART_QUEUE,
  ORDER_EXCHANGE,
  MSG_QUEUE_URL,
} = require("../config");


module.exports.ValidatePayment = async (data) => {
  try {
    //const {paymentMethod} = data;
    let url = 'https://www.cs-wsp.net/_functions/pay';
    const body = data;
    let res = await Axios.post( url , body)
    return res;
  } catch (error) {
    console.log(error)
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
  }
};

module.exports.CreateChannel = async () => {
  try {
  
    const connection = await amqplib.connect(MSG_QUEUE_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(ORDER_EXCHANGE, 'direct', { durable: true });
    await channel.assertQueue(CART_QUEUE, { durable: true });
    return channel;
  } catch (err) {
    throw err;
  }
};

module.exports.PublishOrderEvent = ( channel, msg ) => {
  channel.publish(ORDER_EXCHANGE,"ORDER", Buffer.from(msg));
  console.log("Event Sent To Shopping: ", msg);
};

module.exports.SubscribeEvent = async ( channel, service ) => {
  console.log(` Cart queue Ready to Receive msgs `);

  channel.bindQueue(CART_QUEUE, ORDER_EXCHANGE, "CART");

  channel.consume(CART_QUEUE,
    (msg) => {
      if (msg.content) {
        console.log("the message is:", msg.content.toString());
        service.SubscribeEvents(msg.content.toString());
      }
    },
    {
      noAck: true,
    }
  );
  }

