const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema= new Schema({
    id:{
        type: String
    }, 
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    permission:{
        type: String
    }
},{
    toJSON: {
        transform(doc, ret){
            delete ret.password;
            delete ret.__v;
            delete ret._id;
        }
    },
    timestamps: true
});

module.exports = mongoose.model('users',userSchema);