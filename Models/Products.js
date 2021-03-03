// const db=require('../Util/database');

// const Cart=require('./cart');



// module.exports = class Product{


//     constructor(id,title,imageURL,description,price)
//     {
//         this.id=id;
//         this.title=title;
//         this.imageURL=imageURL;
//         this.description=description;
//         this.price=price;

//     }
//     save(){
//        return db.execute('INSERT INTO products(title,price,imageUrl,description) VALUES (?,?,?,?)',[this.title,this.price,this.imageURL,this.description]);
//     }

//     static delete(id)
//     {
        
//     }

//     static fetchAll() {
//         return db.execute('SELECT * FROM products');
       
//     }
//     static findByID(id){
//      return db.execute('SELECT * FROM products WHERE products.id=?',[id]);
//     }

// };


//Without Sequelize

const Sequelize=require('sequelize');
const sequelize=require('../Util/database');
const Product = sequelize.define('product',{
       id:{type:Sequelize.INTEGER,autoIncrement:true,allowNull:false,primaryKey:true},
       title:Sequelize.STRING,
       price:{type:Sequelize.DOUBLE,allowNull:false},
       imageUrl:{type:Sequelize.STRING,allowNull:false},
       description:{type:Sequelize.STRING,allowNull:false}
});
module.exports=Product;
