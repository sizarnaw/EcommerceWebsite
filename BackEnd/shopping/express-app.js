const express = require('express');
const cors  = require('cors');
const { shopping  } = require('./src/api');
const { CreateChannel } = require('./src/utils')

module.exports = async (app) => {

    app.use(express.json());
    app.use(express.urlencoded({extended : false}))
    app.use(cors());
    app.use(express.static(__dirname + '/public'))

    const orderChannel = await CreateChannel()
    //api
    shopping(app,orderChannel);
    
}