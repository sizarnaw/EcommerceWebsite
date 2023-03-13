const { CUSTOMER_SERVICE, SHOPPING_SERVICE } = require("../config");
const ProductService = require("../services/productService");
const {
  PublishCustomerEvent,
  PublishShoppingEvent,
  SubscribeEvent,
} = require("../utils");
const UserAuth = require("./middlewares/auth");
const roleAuth = require("./middlewares/roleAuth");


module.exports = (app, channel) => {
  const service = new ProductService();

  SubscribeEvent(channel, service)

  app.post("/validate", UserAuth, async (req, res, next) => {
    const cart= req.body
    try {
      const  data  = await service.ValidateProducts(cart);
      if(data){
       return res.status(200).json({data});
      } else {
        return res.status(400).json({data});
      }
    } catch (error) {
      return res.status(404).json({ error });
    }

  });

  app.get("/", UserAuth, async (req, res, next) => {
    //check validation
    try {
      const { data } = await service.GetProducts();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(404).json({ error });
    }
  });

  app.post("/create", UserAuth, roleAuth(["A", "M"]), async (req, res, next) => {
    const { name, category, description, price, stock, ImgUrl } = req.body.formValue;
    // validation
    const { data } = await service.CreateProduct({
      name, category, description, price, stock, ImgUrl
    });
    if (data) {
      return res.json(data);
    } else {
      return res.status(400).json({ message: "Incorrect Username / Password" })
    }
  });
  

  app.put("/updateProduct/:id", UserAuth, roleAuth(["A", "M"]), async (req, res, next) => {
    const productID = req.params.id;
    const  updateInput  = req.body;
    
    // validation
    const data = await service.UpdateProduct({
      updateInput
    }, productID);

    if (data) {
      return res.status(200).json({ message: "Product Successfully Updates" })
    } else {
      return res.status(400).json({ message: "Incorrect Product ID" })
    }
  });

  app.delete("/delete/:id", UserAuth, roleAuth(["A"]), async (req, res, next) => {
    const id = req.params.id;
    // validation
    const  data  = await service.DeleteProduct(id);
    if (data) {
      return res.json(data);
    } else {
      return res.status(400).json({ message: "Product doesnt exist " })
    }
  });

  app.delete("/delete", UserAuth, roleAuth(["A"]), async (req, res, next) => {
    const {id,quantity} = req.body;
    // validation
    const { data } = await service.ReduceProduct(id,quantity);
    if (data) {
      return res.json(data);
    } else {
      return res.status(400).json({ message: "Incorrect Username / Password" })
    }
  });



  app.get("/category/:type", UserAuth, async (req, res, next) => {

    const type = req.params.type;
    const { data } = await service.GetProductsByCategory(type);
    if (data) {
      return res.json(data);
    } else {
      return res.status(400).json({ message: "Incorrect Username / Password" })
    }

  });

  app.get("/:id", UserAuth, async (req, res, next) => {
    const productId = req.params.id;
    const  data  = await service.GetProductDescription(productId);

    if (data) {
      return res.json(data);
    } else {
      return res.status(400).json({ message: "Incorrect ID" })
    }

  });


  // app.get("/comments", UserAuth, async (req, res, next) => {
  //   const id = req.body.id;
  //   try {
  //     const { data } = await service.GetProductComments(id);
  //     return res.status(200).json(data);
  //   } catch (error) {
  //     return res.status(404).json({ error });
  //   }
  // });


  app.post("/comments/:id", UserAuth, roleAuth(["U","A"]), async (req, res, next) => {
    const productId = req.params.id;
    const comment = req.body;
    // validation
    const data = await service.AddComment(comment, productId);

    if (data) {
      return res.status(201).json({ message: data })
    } else {
      return res.status(400).json({ message: "SOMTHING WENT WRONG" })
    }
  });

  app.delete("/comments/delete", UserAuth, roleAuth(["A"]), async (req, res, next) => {
    const {_id,productId} = req.body;
    // validation
    const { data } = await service.DeleteComment(_id,productId);
    if (data) {
      return res.status(201).json({ message: "SUCCESS" })
    } else {
      return res.status(400).json({ message: "SOMTHING WENT WRONG" })
    }
  });






};