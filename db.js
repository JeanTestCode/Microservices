const mysql = require('mysql');
const myconn = require('express-myconnection')
const config = require('./config');

const db = myconn(mysql,config.dbOptions,'single');

module.exports = db;