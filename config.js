'use strict';
const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const{
     PORT,
     HOST,
     HOST_URL,
     HOST_DB,
     PORT_DB,
     USER_DB,
     PASS_DB,
     DATABASE    
} = process.env; 

assert(PORT,'PORT is required');
assert(HOST, 'HOST is required');

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    dbOptions : {
        host: HOST_DB,
        port: PORT_DB,
        user: USER_DB,
        password: PASS_DB,
        database: DATABASE      
    }
}