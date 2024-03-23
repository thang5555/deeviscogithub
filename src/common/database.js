const mongoose= require("mongoose");
module.exports = ()=>{
    mongoose
    .connect("mongodb+srv://thang5555:ANHanh9x@deeviscomongodb.ygmbzai.mongodb.net/deevisco")
    .then(() => console.log("Connected"));
    return mongoose;
};

// mongodb://127.0.0.1:27017/vp_shop_project

// mongodb+srv://thang5555:ANHanh9x@deeviscomongodb.ygmbzai.mongodb.net/deevisco
