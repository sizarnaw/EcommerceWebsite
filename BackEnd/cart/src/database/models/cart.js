const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    userId: { type: String },
    items: [
           {
           
                id: { type: String, require: true},
                name: { type: String },
                category: { type: String },
                description: { type: String },
                ImgUrl: { type: String },
                stock: { type: Number },
                price: { type: Number },
                quantity: { type: Number},
             
        }
        
    ]
},
{
    toJSON: {
        transform(doc, ret){
            delete ret.__v;
            delete ret._id;
        }
    },
    timestamps: true
});

module.exports =  mongoose.model('cart', CartSchema);