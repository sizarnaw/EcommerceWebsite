const express = require('express');
const cors  = require('cors');
const { user } = require('./src/api');

module.exports = async (app) => {

    app.use(express.json());
    app.use(express.urlencoded({extended : false}))
    app.use(cors());
    app.use(express.static(__dirname + '/public'))


    //api
    user(app);

    
    
}