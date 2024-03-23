const UserModel = require("../models/users");
const ProductModel = require("../models/product");
const CommentModel = require("../models/comments");

const index =  async (req, res)=>{
    const users = await UserModel.find();
    const product = await ProductModel.find();
    const comment = await CommentModel.find();
    // req.session.destroy();
    // if(req.session.email){
    //     console.log("ok");
    // }
    const email = req.session.email
    res.render("./admin/admin", {
        users: users.length,
        product: product.length,
        email,
        comment: comment.length,
    });
}
module.exports = {
    index
};