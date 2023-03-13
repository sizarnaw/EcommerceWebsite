const express = require('express');
const { PORT } = require('./config');
const { dbConnection } = require('./database');
const expressApp = require('../express-app');
const helmet = require('helmet');

const StartServer = async() => {
    const app = express();
    app.use(helmet());    
    await dbConnection();


    await expressApp(app);
    app.use(express.urlencoded({extended : false}))
    

    app.listen(PORT, () => {
          console.log(`listening to port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
  
    

}

StartServer();