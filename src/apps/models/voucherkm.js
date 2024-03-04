const mongoose = require("../../common/database")();

const VoucherkmSchema = new mongoose.Schema({
    makm: {
        type: String,
    },
    sotien: {
        type: String,
    },
    trangthai: {
        type: Boolean,
    },
}, {
    timestamps: true,
});

const VoucherkmModel = mongoose.model("Voucherkm", VoucherkmSchema, "voucherkm");
module.exports =VoucherkmModel; 
