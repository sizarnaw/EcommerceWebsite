const jwt = require("jsonwebtoken");
const Axios = require("axios");
const amqplib = require("amqplib");

const {
  APP_SECRET,
  ORDER_QUEUE,
  ORDER_EXCHANGE,
  MSG_QUEUE_URL,
} = require("../config");


module.exports.ValidatePayment = async (data) => {
  try {
    const {paymentMethod} = data;
    let url = 'https://www.cs-wsp.net/_functions/pay';
    const body = paymentMethod;
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
    await channel.assertQueue(ORDER_QUEUE, { durable: true });
    
    return channel;
  } catch (err) {
    throw err;
  }
};


module.exports.PublishQuantityEvent = ( channel, msg ) => {
  channel.publish(ORDER_EXCHANGE, "QUANTITY", Buffer.from(msg));
  console.log("Quantity Event Sent: ", msg);
};
module.exports.PublishCartEvent = ( channel, msg ) => {
  channel.publish(ORDER_EXCHANGE, "CART", Buffer.from(msg));
  console.log("Cart Event Sent: ", msg);
};

module.exports.SubscribeEvent = async ( channel, service ) => {
  console.log(` Order queue Ready to Receive msgs`);

  channel.bindQueue(ORDER_QUEUE, ORDER_EXCHANGE, "ORDER");

  channel.consume(ORDER_QUEUE,
    (msg) => {
      if (msg.content) {
        console.log("the message is:", msg.content.toString());
        service.SubscribeEvents(msg.content.toString());
        payload = JSON.parse(msg.content)
         this.PublishQuantityEvent(channel,JSON.stringify( payload.paymentToken.cart.items));
         this.PublishCartEvent(channel,JSON.stringify( payload.paymentToken.cart.userId));

      }
    },
    {
      noAck: true,
    }
  );
  }
