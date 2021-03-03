const Product=require('../Models/Products.js');

exports.getAddProducts=(req,res,next)=>{
    
    // res.sendFile(path.join(__dirname,'../','Views','add-product.html'));
    // res.render('add-product'); 
    res.render('admin/add-product.ejs',{docTitle:' Add Product',editing:false});
  
  }

exports.postAddProducts=(req,res,next)=>{

//  products.push({title: req.body.title});
const title=req.body.title;
const imageURL=req.body.imageURL;
const price=req.body.price;
const description=req.body.description;
//  const product=new Product(null,title,imageURL,description,price);
//  product.save().then(()=>{res.redirect('/');}).catch(err=>{console.log(err);});
req.user.createProduct({
  title:title,
  price:price,
  imageUrl:imageURL,
  description:description,
  //userId:req.user.id
})
.then(result=>{
  //console.log(result);
  console.log('Created Product');
  res.redirect('/product');
})
.catch(err=>{
  console.log(err);
});
  

}

exports.getEditProducts=(req,res,next)=>{
    
  const editmode=req.query.edit;
  if(!editmode)
  {
   return res.redirect('/');
  }
  const prodId=req.params.productId;
  req.user.getProducts({where:{id:prodId}})
  // Product.findByPk(prodId)
  .then(products=>{
    const product=products[0];
    if(!product)
    {
      return res.redirect('/');
    }
    res.render('admin/edit-product.ejs',{docTitle:' Add Product',editing:editmode,product:product});
  })
  .catch(err=>{console.log(err);
  });
  // Product.findByID(prodId,(product)=>{
  //   if(!product)
  //   {
  //     return res.redirect('/');
  //   }
  //   res.render('admin/edit-product.ejs',{docTitle:' Add Product',editing:editmode,product:product});
  // });
  

}

exports.postEditProducts=(req,res,next)=>{
  const prodId=req.body.productId;
  const updatedTitle=req.body.title;
  const updatedPrice=req.body.price;
  const updatedImageURL=req.body.imageURL;
  const updatedDesc=req.body.description;
  Product.findByPk(prodId)
  .then(product=>{
    product.title=updatedTitle;
    product.price=updatedPrice;
    product.description=updatedDesc;
    product.imageUrl=updatedImageURL;
    return product.save();
  })
  .then(result=>{
    console.log("Updated Product");
    res.redirect('/product');
  })
  .catch(err=>{
    console.log(err);
  });
  // const updatedProduct=new Product(prodId,updatedTitle,updatedImageURL,updatedDesc,updatedPrice);
  // updatedProduct.save();
  // res.redirect('/product');

}

exports.getProduct=(req,res,next)=>{
    req.user.getProducts()
    // Product.findAll()
    .then(products=>{
      res.render('admin/products.ejs',{prods:products,docTitle:'Admin Products',path:'admin/products'});
    })
    .catch(err=>{
      console.log(err);
    });
    // Product.fetchAll((products)=>{
    //     res.render('admin/products.ejs',{prods:products,docTitle:'Admin Products',path:'admin/products'});
    //    });
}

exports.deletePostProducts=(req,res,next)=>{
  const prodId=req.body.ProductId;
  //console.log(prodId);
  Product.findByPk(prodId)
  .then(product=>{
    return product.destroy();
  })
  .then(result=>{
    console.log('Destroyed Product');
    res.redirect('/product');
  })
  .catch(err=>{
    console.log(err);
  });
  // Product.delete(prodId);
  }