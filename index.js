'use strict';
const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const database = require('./db');
const morgan = require('morgan')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const clientsRouter = require("./routes/client-routes")

const options = {
    definition:{
        openapi: "3.0.0",
        info:{
            title: "Clients API",
            version: "1.0.0",
            description: "A simple clients API"
        },
        servers:[
            {
                url: config.url
            }
        ]      
    },
    apis: ["./routes/*.js"]
};

const specs = swaggerJsDoc(options)

const app = express()
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

app.use(database);
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use("/clients", clientsRouter)

//app.listen(config.port, () => console.log('xThe server is running on url http://localhost:'+ config.port));
module.exports.handler = serverless(app);

