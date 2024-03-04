const mongoose = require("../../common/database")();
const productSchema = new mongoose.Schema({
    categori_id:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Categories",
        required:true
    },
    name:{
        type: String,
	    required: true,
	    text: true,
    },
    slug:{
        type: String,
        default: null,
    },
    gioitinh:{
        type: String,
        default: null,
    },
    price:{
        type: String,
        default: 0,
    },
    pricesale:{
        type: String,
        default: 0,
    },
    content:{
        type: Array,
    },
    spmoi:{
        type: Boolean,
    },
    spsale:{
        type: Boolean,
    },
    spbanchay:{
        type: Boolean,
    },
    trangthai:{
        type: Boolean,
    },
    nhomhuong:{
        type: String,
    },
    dotuoi:{
        type: String,
    },
    images:[{
        image:{
            type: String,
        },
        stt:{
            type: String,
        },
        prd_id:{
            type: String,
        },
    }]
},{timestamps:true});
const ProductModel = mongoose.model("Products", productSchema, "product");
module.exports = ProductModel;