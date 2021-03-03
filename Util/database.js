

// const mysql =require('mysql2');
// const pool=mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'node-compelete',
//     password:'shobhit'

// });
// module.exports=pool.promise();

//above code is without sequelize

const Sequelize=require('sequelize');
const sequelize=new Sequelize('node-compelete','root','shobhit',{dialect:'mysql',host:'localhost'});

module.exports=sequelize;