const { ShoppingRepository } = require("../database");
const { FormatResponse} = require("../utils");


// All Business logic will be here
class ShoppingService {

    constructor() {
        this.repository = new ShoppingRepository();
    }

    


    async CreateOrder(id, orderInput) {
        console.log("orderInput",orderInput)

        const orderResult = await this.repository.CreateNewOrder(id, orderInput);
        return orderResult;




    }

    async GetOrders() {

        const orders = await this.repository.Orders();
        return FormatResponse(orders)
    }

    async ChangeOrderStatus(inputParams) {

        const orders = await this.repository.Status(inputParams);
        return orders
    }

    async GetOrderDetails({ id, orderId }) {
        const orders = await this.repository.Orders(productId);
        return FormatResponse(orders)
    }

  


    async SubscribeEvents(payload){
        payload = JSON.parse(payload)
        const extractedPayload = payload.paymentToken;
        const shippingAddress = payload.shippingAddress
        const { paymentToken , cart , id} = extractedPayload
        const products =cart.items
        if(products){
        const orderInput = {products,paymentToken,shippingAddress}
        const res= await this.CreateOrder(id,orderInput);
    
        }
}

}

module.exports = ShoppingService;