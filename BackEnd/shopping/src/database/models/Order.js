const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    orderId: { type: String },
    userId: { type: String },
    status: { type: String },
    paymentToken: { type: String },
    shippingAddress: { type: String },
    items: [
        {   
           
                id: { type: String, require: true},
                quantity: { type: Number},
            
        }
    ]
},
{
    toJSON: {
        transform(doc, ret){
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports =  mongoose.model('order', OrderSchema);