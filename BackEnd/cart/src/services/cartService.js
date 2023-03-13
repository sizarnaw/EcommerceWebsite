const { cartRepository } = require("../database");
const { FormatResponse ,ValidatePayment } = require("../utils");
const Axios = require("axios");



class CartService {


    constructor() {
        this.repository = new cartRepository();
    }



    async GetCart( id ) {

        const cartItems = await this.repository.Cart(id);
        return FormatResponse({cartItems});
    }
    async DeleteCart( userId ) {

        const cartItems = await this.repository.DeleteCart(userId);
        return FormatResponse({cartItems});
    }

    async checkout(user, paymentMethod,auth) {

        const PaymentDone = await ValidatePayment(paymentMethod)
        if(PaymentDone?.status=== 200){
            const cart = await this.GetCart(user.id)
            let url = 'http://localhost:8000/products/validate';
            const body = cart;
            const token = auth;
            Axios.defaults.headers.common['Authorization'] = `${token}`;
            let res = await Axios.post( url , body)
            if(res.data){
                    
                const paymentToken = PaymentDone.data.paymentToken
                const data = { paymentToken:paymentToken,cart:cart.data.cartItems,id:user.id}
                return {"status":200 , data}
            }else {
              return {"status":400 , "message": "Invalid Product Count"}
            }

        }else { 
          
            return {"status":400 , "message": "Payment Failed"}
        }

        
       
    }


    async ManageCart(userId, body, isRemove) {

        const cartResult = await this.repository.AddCartItem(userId, body, isRemove);
        return FormatResponse(cartResult);
    }
    
    async SubscribeEvents(payload){
        payload = JSON.parse(payload)
        const userId = payload
        await this.DeleteCart(userId)
        
      }





}

module.exports = CartService;