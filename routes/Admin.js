const express=require('express');

const path=require('path');

const adminController=require('../Controllers/admin');

const router=express.Router();



router.get('/add-product',adminController.getAddProducts);

 router.get('/product',adminController.getProduct);

  router.post('/add-product',adminController.postAddProducts);

  router.get('/edit-product/:productId',adminController.getEditProducts);

  router.post('/edit-product',adminController.postEditProducts);
  
  router.post('/delete-product',adminController.deletePostProducts);

module.exports=router;
//exports.Products=products;