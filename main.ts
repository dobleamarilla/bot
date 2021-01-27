require('dotenv').config({path: __dirname + '/parametros.env'})
require('source-map-support').install();
require('./components/navegacion');
require('./components/registro');
require('./components/login');
require('./components/menu_ventas');
// const conexion = require('./components/conexion/conexion');

// conexion.recHit('Fac_Tena', 'select top 5 * from [V_Venut_2019-10] WHERE Botiga = 819').then(data=>{
//   console.log(data.recordset[0].Botiga);
// }).catch(err=>{
//   console.log("Conexión MSSQL fallida");
// });