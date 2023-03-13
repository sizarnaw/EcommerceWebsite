const cartService = require("../services/cartService");
const {  SubscribeEvent } = require("../utils");
const UserAuth = require('./middlewares/auth');
const { PublishOrderEvent } = require('../utils')

module.exports = (app,channel) => {

  const service = new cartService();

  SubscribeEvent(channel, service)
  

  app.put('/', UserAuth, async (req, res, next) => {
    const { id } = req.user;
    const { data } = await service.ManageCart(id, req.body, false);

    res.status(200).json(data);

  });

  app.delete('/', UserAuth, async (req, res, next) => {

    const { id } = req.user;


    const { data } = await service.ManageCart(id, req.body, true);

    res.status(200).json(data);

  });

  app.get('/', UserAuth, async (req, res, next) => {

    const  id  = req.user.id;

    try {
      const { data } = await service.GetCart( id );
      return res.status(200).json(data);
    } catch (error) {
      return res.status(404).json({ error });
    }

  });


  app.post('/checkout', UserAuth, async (req, res, next) => {

    const user = req.user;
    const orderInput = req.body;
    const auth = req.get("Authorization")
    const {paymentMethod, shippingAddress} = orderInput
    const data = await service.checkout(user, paymentMethod,auth);

    if (data.status == 400) {
      res.status(400).json({ message: data.message })
      return;
    }
    const paymentToken =data.data
    const payloadd =  {paymentToken, shippingAddress}
    const payload = JSON.stringify( payloadd)
    PublishOrderEvent(channel, payload);
    

    res.status(200).json("success");

  });



}
