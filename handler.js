'use strict';
const querystring = require("querystring")
const mysql=require('mysql');
const { parse } = require('path');
const connection=mysql.createConnection({
  host:'finalpedidosaws.c9jwd0itecy9.us-east-1.rds.amazonaws.com',
  user:'admin',
  port:"3306",
  pasword:'1234567890',
  database:'finalawsdo',
});

module.exports.realizarfinalpedidosaws = async (event) => {
  const pedido = querystring.parse(event["body"])
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "success",
        input: `peticion ${pedido.name}`,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.recibirfinalpedidosaws = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Ejemplo1',
        input: event,
      },
      null,
      2
    ),
  };
};