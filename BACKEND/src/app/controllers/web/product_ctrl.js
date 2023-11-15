const Products = require("../../models/product");
const Users = require('../../models/user');
const Cart = require('../../models/cart');


const addCart = async (req, res, next) => {
   try{
    const {email, id, quantity} = req.body;
    const checkUser = await Users.findOne({ email:  email });
    const product = await Products.findById(id);
    const totalPrice = product.product_price * quantity;
    if (checkUser) {
        let cart = await Cart.findOne({ user: checkUser._id });
        if (!cart) {
          cart = new Cart({
            user: checkUser._id,
            listProduct: [],
            total: 0
          });
        }
        const existingProduct = cart.listProduct.find(
            (item) => item.product.toString() === id
          );
    
          if (existingProduct) {
            existingProduct.quantity += quantity;
          } else {
            cart.listProduct.push({
              product: id,
              quantity: quantity,
            });
          }
    
          cart.total += product.product_price;
          await cart.save();
          res.json('Thêm thành công vào giỏ hàng');
    }
    else{
        res.json('không tìm thấy tài khoản');
    }
   }catch (error){
    next(error);
   }
}

const getProduct = (req, res, next) => {
        Products.find({})
            .then(products => res.json(products))
            .catch(next);
    }

const addProduct = (req, res, next) => {
        var product = new Products({
            id: req.body.id,
            image: req.body.image,
            product_name: req.body.product_name,
            product_price: req.body.product_price,
            so_luong_con_lai: req.body.so_luong_con_lai,
            ton_kho: req.body.ton_kho,
            so_luong_nhap: req.body.so_luong_nhap,
        });
        product.save()
            .then(() => res.json('thêm thành công'))
            .catch(next);                                   
    }

const getAcountUser = (req, res, next) => {
        Users.find({})
            .then(users => res.json(users))
            .catch(next);
    }

const addUser = (req, res, next) => {
        var user = new Users({
            id: req.body.id,
            role: req.body.role,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            image: req.body.image,
            address: req.body.address,
        });
        user.save()
            .then(() => res.json('thêm thành công'))
            .catch(next);
    }

const getCart = async (req, res, next) => {
    Cart.find({})
        .populate('user')
        .populate('listProduct.product')
        .then(carts => res.json(carts))
        .catch(next);
}   

const increaseQuantity = async (req, res, next) => {
    // const {id} = req.body;
    const checkCart = await Cart.find({"listProduct._id": "654b3c44bef3d9abe292ba09"}).populate('listProduct.product');
    let targetProductId ;
    checkCart.forEach(item => {
    item.listProduct.forEach(product => {
        if (product.product._id == "654716ab3d588dbf25d386dd") {
            targetProductId = product.product;
        }});
    });
    if(checkCart) {
        const quantityIncrement = 1;
        const totalPrice = targetProductId.product_price + checkCart[0].total;
        const fillter = {
            "listProduct._id": "654b3c44bef3d9abe292ba09",
            "targetProductId._id": "654716ab3d588dbf25d386dd"
        };
        
        Cart.updateOne(fillter, {
            $inc: {
                "listProduct.$.quantity": 2,
            },
            $set: {
                total: totalPrice,
            }
            })
            .then(() => res.json('cập nhật thêm số lượng và cập nhật giá trị thành công!!'))
            .catch(next);
    }else{
        res.json('không tìm thấy id Cart');
    }
}

const decreaseQuantity = async (req, res, next) => {
    const {id} = req.body;
    const checkCart = await Cart.findById(id);
    if(checkCart) {
        const quantityIncrement = -1;
        const totalPrice = - checkCart.product.product.product_price + checkCart.total;
        Cart.updateOne({_id: id}, {
            $inc: {
                quantity: quantityIncrement,
            },
            $set: {
                total: totalPrice,
            },
        },
        
        )
            .then(() => res.json('cập nhật xóa số lượng và cập nhật giá trị thành công!!'))
            .catch(next);

    }else{
        res.json('không tìm thấy id Cart');
    }
}

const deleteCart = async (req, res, next) => {
    const {idcart, idproduct} = req.query;
    const product = await Products.findById(idproduct);
    const discount = product.product_price * idcart;
    Cart.findOneAndUpdate({}, 
        {
            $pull: {
            listProduct: {
                product: idproduct, 
            }},
            $inc:{
                total: -discount,
            }
        },
    )
        .then(() => console.log('đã xóa'))
        .catch(next);
}

const ordered = async (req, res, next) => {
    const {email} = req.query;
    const checkIduserWithEmail = await Users.findOne({email: email});
    const idUser = checkIduserWithEmail._id;
    const checkCartWithIduser = await Cart.findOne({user: idUser});
    if(checkCartWithIduser) {
        Cart.updateOne({}, {$set: {
            order: true,
        }})
        .then(() => console.log('đặt hàng thành công'))
        .catch(next);
    }else{
        console.log('đặt hàng không thành công');
    }
}

const getordered = async(req, res, next) => {
    Cart.find({order: true})
        .populate('user')
        .populate('listProduct.product')
        .then(ordereds => res.json(ordereds))
        .catch(error = 'chưa có sản phẩm nào đã được đặt');
}

const getProductId = async (req, res, next) => {
    const {id} = req.query;
    Products.findOne({id: id})
        .then(products => res.json(products))
        .catch(next);
}
const search = async (req, res, next) => {
    const search = req.body;
    const key = JSON.stringify(search);
    if(key) {
        Products.find({ $text: { $search: key}})
            .then(products => res.json(products))
            .catch(next);
    }
}
module.exports = {
    addCart,
    getProduct,
    addProduct,
    getAcountUser,
    addUser,
    getCart,
    increaseQuantity,
    decreaseQuantity,
    deleteCart,
    ordered,
    getordered,
    getProductId,
    search,
};
// module.exports = new ProductController;