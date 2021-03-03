const path=require('path');

const express=require('express');

const dirName=require('../Util/Paths.js');

const adminData=require('./Admin')

const shopController=require('../Controllers/shop');
const { render } = require('pug');
const router=express.Router();
router.get('/',shopController.getIndex);
router.get('/products',shopController.getProducts);
router.get('/products/:productID',shopController.getProduct);
router.get('/cart',shopController.getCart);
router.post('/cart',shopController.postCart);
router.post('/create-order',shopController.postOrder);
router.post('/cart-delete-item',shopController.postCartDeleteProduct);
router.get('/orders',shopController.getOrders);
router.get('/checkout',shopController.checkout);


module.exports=router;
