const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
        id: {
                type: Number,
            },
        role: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        address: {
            type: String
        }
    },
    { 
        timestamps: true 
    }
);

const User = mongoose.model('User', UserSchema);
module.exports =  User;


