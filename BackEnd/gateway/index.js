const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');
const helmet = require('helmet');


const app = express();



app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use(express.json());

app.use('/products', proxy('https://pws236369-products-ramze10.onrender.com'));
app.use('/shopping', proxy('https://pws236369-shopping-ramze10.onrender.com'));
app.use('/cart', proxy('https://pws236369-cart-ramze10.onrender.com'));
app.use('/', proxy('https://pws236369-users-ramze10.onrender.com'));



app.listen(8000, () => {
      console.log(`gateway listening to port 8000`);
})


