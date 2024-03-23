const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");
const pagination = require("../../common/pagination");
const slug = require("slug");
const fs = require("fs");
const path = require("path");
const CommentModel = require("../models/comments");
const OrderModel = require("../models/order");
const index = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = page * limit - limit;
    const totalRows = await ProductModel.find().countDocuments();
    const totalPages = Math.ceil(totalRows / limit)
    const products = await ProductModel
        .find({})
        .populate({ path: "categori_id" })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit);
    const next = page + 1;
    const hasNext = page < totalPages ? true : false;
    const prev = page - 1;
    const hasPrev = page > 1 ? true : false;
    res.render("./admin/products/product", {
        products,
        page,
        totalPages,
        next,
        hasNext,
        prev,
        hasPrev,
        pages: pagination(page, totalPages),
    })
}
const create = async (req, res) => {
    const categories = await CategoryModel.find();
    res.render("./admin/products/add_product", { categories })
}
const store = async (req, res) => {
    const { files, body } = req;
    const product = {
        categori_id: body.categori_id,
        name: body.name,
        slug: slug(body.name),
        gioitinh: body.gioitinh,
        price: body.price,
        pricesale: body.pricesale,
        content: body.content,
        spmoi: body.spmoi == "on",
        spsale: body.spsale == "on",
        spbanchay: body.spbanchay == "on",
        trangthai: body.trangthai,
        nhomhuong: body.nhomhuong,
        dotuoi: body.dotuoi,
    }
    if(files){
    const uploadimg=[];
    for( item of files){
      uploadimg.push(item.originalname);
      fs.renameSync(item.path, path.resolve("src/public/site/images/New folder", item.originalname));
    }

    const images=[];
    for(var i=0; i<files.length; i++){
        img = {
            stt: i,
            image: uploadimg[i]
        }
        images.push(img)
    }
    product["images"]=images;
    new ProductModel(product).save();
    res.redirect("/admin/products");
        
    }
}

const edit = async (req, res) => {
    const id = req.params.id;
    const categories = await CategoryModel.find();
    const product = await ProductModel.findById(id);
    res.render("./admin/products/edit_product", { categories, product });
}
const update = async (req, res)=>{
    const id = req.params.id;
    const{files, body}= req;
    const product = {
        categori_id: body.categori_id,
        name: body.name,
        slug: slug(body.name),
        gioitinh: body.gioitinh,
        price: body.price,
        pricesale: body.pricesale,
        content: body.content,
        spmoi: body.spmoi == "on",
        spsale: body.spsale == "on",
        spbanchay: body.spbanchay == "on",
        trangthai: body.trangthai,
        nhomhuong: body.nhomhuong,
        dotuoi: body.dotuoi,
    }
    if(files){
        const uploadimg=[];
        for( item of files){
          uploadimg.push(item.originalname);
          fs.renameSync(item.path, path.resolve("src/public/site/images/New folder", item.originalname));
        }
    
        const images=[];
        for(var i=0; i<files.length; i++){
            img = {
                stt: i,
                image: uploadimg[i]
            }
            images.push(img)
        }
        product["images"]=images;
    }
    await ProductModel.updateOne({_id: id}, {$set: product});
    res.redirect("/admin/products");
}

const del = async (req, res) => {
    const id = req.params.id;
    await ProductModel.deleteOne({_id: id});
    res.redirect("/admin/products");
}

const comment = async (req, res) =>{
    const comments = await CommentModel.find({});
    res.render("admin/comment/comment",{comments});
}
const deletecomment = async (req, res) =>{
    const id = req.params.id;
    await CommentModel.deleteOne({_id: id});
    res.redirect("/admin/comment");
}
const order = async (req, res) =>{
    const orderCart = await OrderModel.find({});
   
    res.render("admin/order/order", {orderCart})
}
const editOrder = async (req, res) =>{
    const id = req.params.id;
    const body = req.body;
    console.log(body);
    console.log(id);
    // const orderCart = {
    //     trangthai: body.trangthai == "on",
    // }
    // await ProductModel.updateOne({_id: id}, {$set: orderCart});
    res.redirect("/admin/order")
}
module.exports = {
    index,
    create,
    store,
    edit,
    update,
    del,
    comment,
    deletecomment,
    order,
    editOrder,
}