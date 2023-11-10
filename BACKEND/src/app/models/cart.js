const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  // product: {
  //   type: Object,
  //   ref: "Product",
  //   required: true
  // },
  listProduct: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
    }
  ],
  
  total: {
    type: Number,
    required: true
  },
  order: {
    type: Boolean,
    default: false,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped'],
    default: 'pending'
  }
});


const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
