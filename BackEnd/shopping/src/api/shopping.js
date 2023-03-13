const ShoppingService = require("../services/shoppingService");
const {  SubscribeEvent } = require("../utils");
const UserAuth = require('./middlewares/auth');
const { CUSTOMER_SERVICE } = require('../config');
const roleAuth = require("./middlewares/roleAuth");

module.exports = (app,channel) => {

  const service = new ShoppingService();

  SubscribeEvent(channel, service)

  app.get('/orders', UserAuth, roleAuth(["A","M","W"]), async (req, res, next) => {


    const { data } = await service.GetOrders();

    res.status(200).json(data);

  });

  app.post('/order',UserAuth , async (req, res, next) => {

    const { id } = req.user;
    const input = req.body;

    const { data } = await service.CreateOrder(id,input);
    

    res.status(200).json(data);

  });

  app.put('/orders/status', UserAuth, roleAuth(["A"]),  async (req, res, next) => {

    const input = req.body;

    const data  = await service.ChangeOrderStatus(input);
    if(data.status==400){
      res.status(400).json(data);
    }else {
    res.status(200).json(data);
  }


  });



}