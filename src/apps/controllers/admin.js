const UserModel = require("../models/users");
const ProductModel = require("../models/product");

const index =  async (req, res)=>{
    const users = await UserModel.find();
    const product = await ProductModel.find();
    // req.session.destroy();
    // if(req.session.email){
    //     console.log("ok");
    // }
    const email = req.session.email
    res.render("./admin/admin", {
        users: users.length,
        product: product.length,
        email,
    });
}
module.exports = {
    index
};