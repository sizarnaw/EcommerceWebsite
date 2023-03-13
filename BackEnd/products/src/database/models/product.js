const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema= new Schema({
    id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    ImgUrl:{
        type: String
    },
    price:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    comments:[
        {
        username: String,
        comment: String
    }
    ],
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

module.exports =  mongoose.model('product', productSchema);