//const products=[];
const Product=require('../Models/Products.js');
const Cart=require('../Models/Cart.js');
const Order=require('../Models/order');


exports.getProducts=(req,res,next)=>{

  Product.findAll()
    .then(product=>{
      res.render('shop/product-list.ejs',{prods:product,docTitle:'All Products'});
    })
    .catch(err=>{
      console.log(err);
    });
    
  //  Product.fetchAll()
  //  .then(([rows,fieldData])=>{
  //   res.render('shop/product-list.ejs',{prods:rows,docTitle:'All Products'});
  // })
  //  .catch(err=>{console.log(err);});
   
 }

   exports.getProduct=(req,res,next)=>{
    const prodID=req.params.productID;
    //console.log(prodID);
    Product.findByPk(prodID)
    .then(product=>{
      res.render('shop/detail.ejs',{product:product,docTitle:' product '});
    })
    .catch(err=>{
      console.log(err);
    });

 

   }

exports.getIndex=(req,res,next)=>{
    Product.findAll()
    .then(product=>{
      // console.log(product);
      res.render('shop/index.ejs',{prods:product,docTitle:'Shop'});
    })
    .catch(err=>{
      console.log(err);
    });
   
}

exports.getCart=(req,res,next)=>{
  // Cart.getCart(cart=>{
  //   Product.fetchAll(products=>{
  //     const cartProducts=[];
  //     for(product of products){
  //       const cartProductData=cart.products.find(prod=>prod.id===product.id);
  //       if(cartProductData){
  //         cartProducts.push({productData:product,qty:cartProductData.qty});
  //       }
  //     }
  //     res.render('shop/cart.ejs',{path:'/cart',docTitle:'Your Cart',products:cartProducts});
  //   });
    
  // });
  
  req.user.getCart()
  .then(cart=>{
    return cart.getProducts()
    .then(product=>{
      res.render('shop/cart.ejs',{path:'/cart',docTitle:'Your Cart',products:product});
    })
    .catch(err=>{console.log(err);});
  })
  .catch(err=>{console.log(err);});

}
// exports.postCart=(req,res,next)=>{
//   const prodID=req.body.productId;
//   console.log(prodID);
//   res.redirect('/cart');
// }

exports.postCart=(req,res,next)=>{
  const prodID=req.body.productId;
  let fetchedCart;
  let newQuantity=1;
  // Product.findByID(prodID,(product)=>{
  //   Cart.addProduct(prodID,product.price);
  // });
  // res.redirect('/cart');
  req.user.getCart()
  .then(cart=>{
    fetchedCart=cart;
    return cart.getProducts({where:{id:prodID}});
  })
  .then(products=>{
    let product;
    if(products.length>0){
      product=products[0];
    }
    
    if(product){
       const oldQuantity=product.cartItem.quantity;
       newQuantity=oldQuantity+1;
      //  return fetchedCart.addProduct(product,{
      //    through:{quantity:newQuantity}
      //  });
      return product;
    }
    return Product.findByPk(prodID)
    // .then(product=>{
    //   return fetchedCart.addProduct(product,{through:{quantity:newQuantity}})
    // })
    // .catch(err=>{
    //   console.log(err);
    // });
  })
  .then(product=>{
    return fetchedCart.addProduct(product,{
      through:{quantity:newQuantity}
    });
  })
  .then(()=>{
    res.redirect('/cart');
  })
  .catch(err=>console.log(err));
}

exports.postCartDeleteProduct=(req,res,next)=>{
  const prodId=req.body.productId;
  req.user.getCart()
  .then(cart=>{
    return cart.getProducts({where:{id:prodId}});
  })
  .then(products=>{
    const product=products[0];
    return product.cartItem.destroy();
  })
  .then(result=>{
    res.redirect('/cart');
  })
  .catch(err=>console.log(err));
  // Product.findByID(prodId,p=>{
  //   Cart.deleteProduct(prodId,p.price);
  //   res.redirect('/cart');
  // });
  
};

exports.postOrder=(req,res,next)=>{
  let fetchedCart;
     req.user.getCart()
     .then(cart=>{
       fetchedCart=cart;
       return cart.getProducts();
     })
     .then(products=>{
      return req.user
      .createOrder()
       .then(order=>{
         return order.addProducts(
           products.map(product=>{
          product.orderItem={quantity:product.cartItem.quantity} 
          return product;
         })
         );
       })
       .catch(err=>console.log(err));
       
     })
     .then(result=>{
       fetchedCart.setProducts(null);
      
     })
     .then(reult=>{
      res.redirect('/orders');
     })
     .catch(err=>console.log(err));
};

exports.getOrders=(req,res,next)=>{
    req.user.getOrders({include:['products']})
    .then(orders=>{
      res.render('shop/orders.ejs',{path:'/order',docTitle:'Your Orders',orders:orders});
    }).catch(err=>{
       console.log(err);
    })
    
  
  }
exports.checkout=(req,res,next)=>{
    res.render('shop/checkout.ejs',{path:'/checkout',docTitle:'Checkout'});
}