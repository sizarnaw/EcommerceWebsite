const mongoose = require('mongoose');
const { ProductModel } = require("../models");
class ProductRepository {


    async CreateProduct({ name, category, description, price, stock, ImgUrl }) {
        const newestProduct = await ProductModel.find().sort({ "createdAt": -1 }).limit(1)
        let id = newestProduct.length > 0 ? parseInt(newestProduct[0].id) + 1 : "1";
        const product = new ProductModel({
            id, name, category, description, price, stock, ImgUrl
        })

        const productResult = await product.save();
        return productResult;
    }


    async UpdateProduct(newProduct, productID) {
        let res = await ProductModel.find({ id: productID });
        if (res) {
            return await ProductModel.findOneAndUpdate({ id: productID }, {
                $set: newProduct.updateInput
            })
        }
        return null;
    }

    async Products() {
        return await ProductModel.find();
    }

    // async ProductComments(id) {
    //     const product = await ProductModel.findOne(id);
    //     return product.comments
    // }
    async ValidateProducts(cart) {
        const products = await ProductModel.find();
        const validateProduct = cart.data.cartItems.items;
        let Validated = true;
        validateProduct.forEach(function (value) {
            const id = value.id
            const reduceStock = value.quantity
            const currentStock = products.find(item => item.id === id)?.stock || 0

            if (products.find(item => item.id === id)?.stock < value.quantity) {
                Validated = false
            }
        });
        if (!Validated) {
            return false;
        }
        return true;
    }

    async DeleteProduct(id) {

        return await ProductModel.findOneAndDelete({ id: id });

    }
    async DeleteComment(_id,productId) {
        return await ProductModel.updateOne({id:productId}, { $pull: { comments: { _id: _id } } });
        

    }
    async AddComment(comment, productId) {

        const x =  await ProductModel.findOne({ id: productId });
        x.comments.push(comment);
         await x.save();
         return x.comments[x.comments.length - 1];
        

    }
    async ReduceProduct(payload) {
        for (const product of payload) {
            const id = product.id ;
            const productFromDB = await ProductModel.findOne({ id });
            if (!productFromDB) return "No Product Found"

            const newStock = productFromDB.stock - product.quantity;
            if (newStock < 0) return "not enough quantity"
            if (newStock == 0) {
                await ProductModel.deleteMany({ id });
            } else {
                console.log("Reducing for id , to new stock", id, newStock)
                await ProductModel.findOneAndUpdate({ id }, { stock: newStock });
            }
        }

        return "success"

    }

    async FindById(id) {

        return await ProductModel.findOne({ id: id });
    }



    async FindByCategory(category) {

        const products = await ProductModel.find({ category: category });

        return products;
    }

}

module.exports = ProductRepository;