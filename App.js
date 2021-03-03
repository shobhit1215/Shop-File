//const http=require('http');

const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
//const mongoConnect=require('./Util/database').mongoConnect;
const sequilize=require('./Util/database');
const Product=require('./Models/Products');
const User=require('./Models/user');
const Cart=require('./Models/Cart');
const CartItem=require('./Models/cart-item');
const Order=require('./Models/order');
const OrderItem=require('./Models/order-item');
const app=express();

app.set('view engine','ejs');
app.set('views','Views');

const adminRoutes=require('./routes/Admin');
const shopRouter=require('./routes/Shop');
// db.execute('SELECT * FROM products')
// .then(result=>{
//     console.log(result[0],result[1]);
// })
// .catch(err=>{
//     console.log(err);
// });
// db.execute
//const errorPage=require('./Controllers/error.js')
// const routes=require('./Route.js') //routes contains the function exported in the route.js file 
// function rqListener(req,res)
// {
//    console.log(req.url,req.method,req.headers);
//    //process.exit(); //it is used to exit the  programme when a particular request is processed
//    res.setHeader('Content-Type','text/html');
//    res.write('<html>');
//    res.write('<head><title>My first page</title></head>');
//    res.write('<body><h1>Hello from my node.js server</h1></body>');
//    res.write('</html>');
//    res.end();
// }
// function rqListener(req,res)
// {
   
   
// }


//if we send request from above middleware then next middlewarte will never be called.
app.use(bodyParser.urlencoded({extended:'false'}));

app.use(express.static(path.join(__dirname,'Public')));

app.use((req,res,next)=>{
  User.findByPk(1)
  .then(user=>{
      req.user=user;
      next();
  })
  .catch(err=>{
      console.log(err);
  });
});


app.use(shopRouter);
//app.use(adminRoute.routes);
app.use(adminRoutes);
app.use((req,res,next)=>{
    //res.status(404).sendFile(path.join(__dirname,'Views','Error.html'));
    //res.status(404).sendFile(path.join(__dirname,'Views','Error.html'));
    res.status(404).render('Error.ejs',{docTitle:'Error',path:'/404'});
});


//app.post execute it only for post request similarly we use app.get for get request

Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product,{through:OrderItem});

sequilize
//.sync({force:true})
 .sync()
.then(result=>{
    return User.findByPk(1);
    //console.log(result);
    
})
.then(user=>{
   if(!user){
     return  User.create({name:'Max',email:'test@gmail.com'});
   } 
   return user;
})
.then(user=>{
   // console.log(user);
   return user.createCart();
    
})
.then(cart=>{
    app.listen(3020);
})
.catch(err=>{
    console.log(err);
});







// const server=http.createServer(app);
//Nodejs always calls rqListener whenever a request is made
//This function takes two argument request and response
//we can also do


// http.createServer((req,res)=>{

// });

// server.listen(3002);



//const products=[];
// const Product=require('../Models/Products.js');

// exports.getAddProducts=(req,res,next)=>{
    
//     // res.sendFile(path.join(__dirname,'../','Views','add-product.html'));
//     // res.render('add-product'); 
//     res.render('add-product.ejs',{docTitle:' Add Product'});
  
//   }

// exports.postAddProducts=(req,res,next)=>{

// //  products.push({title: req.body.title});
//  const product=new Product(req.body.title);
//  product.save();
//   res.redirect('/');

// }  

// exports.getProducts=(req,res,next)=>{
//     // console.log(adminData.Products);
//     // res.sendFile(path.join(dirName,'Views','Shop.html'));
//     //const products=adminData.Products;
//    const products=Product.fetchAll();
//     res.render('Shop.ejs',{prods:products,docTitle:'Shop'});
//    }
