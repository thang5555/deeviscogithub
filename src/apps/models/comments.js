const mongoose = require("../../common/database")();
const commentSchema = new mongoose.Schema({
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
    },
    email:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    name:{
        type:String,
        required: true,
    },
}, {timestamps:true});
const CommentModel = mongoose.model("Comments", commentSchema, "comment");
module.exports = CommentModel;