const mongoose = require('mongoose');
const { MONGO_URL } = require('../config');

module.exports = async() => {

    try {
        console.log("cart connection : " , MONGO_URL )
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('cart Db Connected');
        
    } catch (error) {
        console.error('DB Connection failed!')
        console.log(error);
    }
 
};
