const mongoose = require("../../common/database")();
const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    add: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    trangthai: {
        type: Boolean,
        required: true,
    },
    items: [{
        name: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        qty: {
            type: String,
            required: true,
        },
    }],
}, {
    timestamps: true,
});

const OrderModel = mongoose.model("Order", orderSchema, "order");
module.exports = OrderModel; 
