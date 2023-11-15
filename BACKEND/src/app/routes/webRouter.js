const express = require('express');
const routerUser = express.Router();
const {
    getProduct,
    addProduct,
    getAcountUser,
    addUser,
    getCart,
    addCart,
    increaseQuantity,
    decreaseQuantity,
    deleteCart,
    ordered,
    getordered,
    getProductId,
    
    } = require('../controllers/web/product_ctrl');

routerUser.route('/').get(getProduct).post(addProduct);
routerUser.route('/product').get(getProductId);
routerUser.route('/user').get(getAcountUser).post(addUser);
routerUser.route('/cart').get(getCart).post(addCart).put(increaseQuantity);
routerUser.route('/deleteCart').put(deleteCart);
routerUser.route('/decreaseQuantity').put(decreaseQuantity);
routerUser.route('/ordered').put(ordered).get(getordered);
module.exports = routerUser;