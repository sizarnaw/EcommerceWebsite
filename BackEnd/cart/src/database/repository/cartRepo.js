const mongoose = require('mongoose');
const {  CartModel } = require('../models');
const { v4: uuidv4 } = require('uuid');


class cartRepository {

   

  
    async Cart(userId){

        const cartItems = await CartModel.findOne({ userId: userId });


        if(cartItems){
            return cartItems;
        }

    }

    async DeleteCart(userId){
        const res= CartModel.findOne({userId: userId})
        return await CartModel.findOneAndDelete({ userId: userId });



    }

    async AddCartItem(userId,body,isRemove){
 
            const cart = await CartModel.findOne({ userId: userId })

            const  id  = body.id;

            if(cart){
                
                let isExist = false;

                let cartItems = cart.items;

                if(cartItems.length > 0){

                    cartItems.map(item => {
                        if(item.id.toString() === id.toString()){
                            if(isRemove){
                                
                                if( item.quantity-body.quantity <= 0 ){
                                    cartItems.splice(cartItems.indexOf(item), 1);
                                }else {
                                    item.quantity -= body.quantity
                                }
                               
                             }else{
                               
                               item.quantity += body.quantity;
                            }
                             isExist = true;
                        }
                    });
                } 
                
                if(!isExist && !isRemove){
                    cartItems.push({ ...body });
                }

                cart.items = cartItems;

                return await cart.save()
 
            }else{

               return await CartModel.create({
                    userId,
                    items:[{  ...body }]
                })
            }

        
    }
 


}

module.exports = cartRepository;