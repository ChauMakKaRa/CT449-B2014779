const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: Number},
    image: { type: String },
    product_name: { type: String},
    product_price: { type: Number },
    so_luong_con_lai: {type: Number},
    ton_kho: {type: Number},
    so_luong_nhap: {type: Number},
});

productSchema.pre('save', function (next) {
    const doc = this;
    if (doc.isNew) {
      mongoose.model('Product', productSchema)
        .findOne({}, {}, { sort: { id: -1 } })
        .then((lastProduct) => {
          doc.id = lastProduct ? lastProduct.id + 1 : 1;
          next();
        })
        .catch((error) => {
          next(error);
        });
    } else {
      next();
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;