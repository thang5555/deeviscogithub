const ProductModel = require("../models/product");
const CategoryModel = require("../models/category");
const UserModel = require("../models/users")
let test = async (req, res) => {
    
    //     ProductModel.find({}, (err, docs)=>{
    //         console.log(docs);
    //    });


    // const a = 1000;
    // const promise = new Promise((res, rej) => {
    //     setTimeout(() => {
    //         res(8000);
    //     });
    // });
    // promise.then((data) => {
    //     console.log(a + data);
    // });

    ES7
    const products = await ProductModel.find();
    console.log("products");


    // const products = await UserModel.find();
    // console.log("products");
}

const testForm = (req, res) => {
    res.send(`
    <form method="post">
            <input type="text" name="mail"/>
            <input type="text" name="pass"/>
            <input type="submit" name="sbm" value="Đăng nhập"/>
        </form>
    `);
};

const actionFrom = (req, res) => {
    res.send(req.body.mail);

}
module.exports = {
    test,
    testForm,
    actionFrom,
};