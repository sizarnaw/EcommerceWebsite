const mongoose = require('mongoose');
const { OrderModel } = require('../models');
const { v4: uuidv4 } = require('uuid');

//Dealing with data base operations
class ShoppingRepository {

    async Orders(){

        const orders = await OrderModel.find();
        
        return orders;

    }
    async Status(input){

        const { orderId,status,newStatus  } = input;
        if(newStatus == "Waiting for Delivery" && status == "Shipping"){
            return {"status":400 , "message": "Order Status Cannot go Back to Waiting For Delivery"}
        }
        if(newStatus == "Waiting for Delivery" && status == "Shipped"){
            return {"status":400 , "message": "Order Status Cannot go Back to Waiting For Delivery"}
        }
        if(newStatus == "Shipping" && status == "Shipped"){
            return {"status":400 , "message": "Order Status Cannot go Back to Shipping"}
        }
    
    
        const product= await OrderModel.findOneAndUpdate({orderId: orderId},{status: newStatus});;
        return   {"status":200 , "message": product}
        
    }

 
    async CreateNewOrder(userId, orderInput){
        const { paymentToken,shippingAddress,products } =orderInput
        if(orderInput){           

            if(products.length > 0){
                //process Order
                const orderId = uuidv4();
                const order = new OrderModel({
                    shippingAddress,
                    orderId,
                    userId,
                    paymentToken,
                    status: 'Waiting for Delivery',
                    items: products
                })
                
                const orderResult = await order.save();
                return orderResult;
            }else {
                return {message: "Order Creation Failed"}
            }


            }
        

 

        }


    

}

module.exports = ShoppingRepository;