'use strict';
const querystring = require("querystring")
const mysql=require('mysql');
const connection=mysql.createConnection({
  host:'finalpedidosaws.c9jwd0itecy9.us-east-1.rds.amazonaws.com',
  user:'admin',
  port:'3306',
  password:'1234567890',
  database:'centrocomercial',
});

module.exports.realizarfinalpedidosaws = async (event) => {
  const pedidos = querystring.parse(event["body"])
  await new Promise((resolve, reject) => {
  const queryclient = "CALL insert_pedidos(?,?,?,?,?);";
    connection.query(queryclient,[pedidos.producto_id,pedidos.cantidadund,pedidos.valor_unidad,pedidos.valor_total,pedidos.cliente_id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "success",
        cliente_id: pedidos.cliente_id,
        producto_id: pedidos.producto_id,
        cantidad_und: pedidos.cantidadund,
        valorUnidad: pedidos.valor_unidad,
        valorTotal: pedidos.valor_total,  
      },
      null,
      2
    ),
  };
  connection.end();
};


module.exports.recibirfinalpedidosaws = async (event) => {
  const pedidos = event.queryStringParameters.id;
  const queryPedido = "SELECT * FROM centrocomercial.pedido WHERE id = ?";
  const consultar = await new Promise((resolve, reject) => {
    connection.query(queryPedido, [pedidos], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        pedido: consultar[0],
      },
      null,
      2
    ),
  };
};