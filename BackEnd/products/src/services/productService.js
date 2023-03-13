const { ProductRepository } = require("../database");
const { FormatResponse } = require("../utils");

class ProductService {
   

    constructor() {
        this.repository = new ProductRepository();
    }


    async CreateProduct(newProduct) {
        
        const productResult = await this.repository.CreateProduct(newProduct)
        return FormatResponse(productResult);
    }

    async DeleteProduct(productToDelete) {

        const productResult = await this.repository.DeleteProduct(productToDelete)
        return FormatResponse(productResult);
    }
    async DeleteComment(_id,productId) {

        const productResult = await this.repository.DeleteComment(_id,productId)
        return productResult;
    }
    async ReduceProduct(id,quantity) {

        const productResult = await this.repository.ReduceProduct(id,quantity)
        return FormatResponse(productResult);
    }
    async UpdateProduct(newProduct, productID) {
        const productResult = await this.repository.UpdateProduct(newProduct, productID)
        return productResult;
    }

    async GetProducts() {
        const products = await this.repository.Products();


        return FormatResponse({ products })

    }
    // async GetProductComments(id) {
    //     const products = await this.repository.ProductComments(id);


    //     return FormatResponse({ products })

    // }
    async ValidateProducts(cart) {
        const products = await this.repository.ValidateProducts(cart);

        return products

    }


    async GetProductDescription(productId) {

        const product = await this.repository.FindById(productId);
        return product
    }

    async GetProductsByCategory(category) {

        const products = await this.repository.FindByCategory(category);
        return FormatResponse(products)

    }


    async SubscribeEvents(payload){
        
         payload = JSON.parse(payload)
         console.log("GOT TO RECUDE PRODUCT" ,payload)
         await this.repository.ReduceProduct(payload)
        
      }
       

    async AddComment(comment, productId) {
        const products = await this.repository.AddComment(comment, productId);

        return  products 

    }


}

module.exports = ProductService;