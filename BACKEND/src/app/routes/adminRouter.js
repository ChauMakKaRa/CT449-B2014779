const express = require('express');
const routerAdmin = express.Router();

const {addProduct,deleteProduct,editProduct,getorder,submitOrders} = require('../controllers/user/admin_ctll');

routerAdmin.route('/addproduct').post(addProduct);
routerAdmin.route('/deleteproduct').delete(deleteProduct);
routerAdmin.route('/editproduct').put(editProduct);
routerAdmin.route('/orders').get(getorder).put(submitOrders);


module.exports = routerAdmin;