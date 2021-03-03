// const fs =require('fs');
// const path=require('path');
// const p=path.join(path.dirname(process.mainModule.filename),'data','cart.json');
// module.exports=class cart{

//   static addProduct(id,prodPrice){
//      //fetch the previous cart
//     fs.readFile(p,(err,fileContent)=>{
//         let cart={products:[],totalPrice:0};
//         if(!err){
//             cart=JSON.parse(fileContent);
//         }
//     //Analyze the cart
//     const existingProductIndex=cart.products.findIndex(prod=>prod.id===id);
//     const existingProduct=cart.products[existingProductIndex];
//     let updatedProduct;
//     //add new product
//     if(existingProduct)
//     {
//         updatedProduct={...existingProduct};
//         updatedProduct.qty=updatedProduct.qty+1;
//         cart.products=[...cart.products];
//         cart.products[existingProductIndex]=updatedProduct;
//     }
//     else{
//         updatedProduct={id:id,qty:1};
//         cart.products=[...cart.products,updatedProduct];
//     }
//     cart.totalPrice=cart.totalPrice+ +prodPrice;
//     fs.writeFile(p,JSON.stringify(cart),err=>{
//         console.log(err);
//     });
//     });

//   }

//     static deleteProduct (id,productPrice)
//     {
//        fs.readFile(p,(err,fileContent)=>{
//         if(err){
//             return;
//         }
//         const updatedCart={...JSON.parse(fileContent)};
//         // console.log(updatedCart);
//         // console.log(id);
//         const product=updatedCart.products.find(prod=>prod.id===id);  
//         //console.log(product);  
//         if(!product)
//         {
//             return;
//         }
//         const productQty=product.qty;
//         updatedCart.products=updatedCart.products.filter(prod=>prod.id!==id);
//         updatedCart.totalPrice=updatedCart.totalPrice-productPrice*productQty;
//         fs.writeFile(p,JSON.stringify(updatedCart),err=>{
//             console.log(err);
//         });
//     });

//     }

//      static getCart (cb){
//         fs.readFile(p,(err,fileContent)=>{
//              const cart=JSON.parse(fileContent);
//              if(err){
//                  cb(null);
//              }else{
//                 cb(cart);
//              }
             
//         }) ;

//      }

// }

const Sequelize=require('sequelize');
const sequelize=require('../Util/database');

const Cart=sequelize.define('cart',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    }



});

module.exports=Cart;
