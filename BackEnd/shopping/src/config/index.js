const dotEnv = require("dotenv");


  dotEnv.config();


module.exports = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  APP_SECRET: process.env.APP_SECRET,
  MSG_QUEUE_URL: process.env.MSG_QUEUE_URL,
  ORDER_EXCHANGE: "ORDER_EXCHANGE",
  ORDER_QUEUE: "order_queue",
  CART_QUEUE: "cart_queue",
  QUANTITY_QUEUE: "quantity_queue"

  
};