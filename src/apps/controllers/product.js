const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");
const pagination = require("../../common/pagination");
const slug = require("slug");
const fs = require("fs");
const path = require("path")
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
const store = (req, res) => {
    const { file, body } = req;

    const product = {
        name: body.name,
        slug: slug(body.name),
        gioitinh: body.gioitinh,
        price: body.price,
        pricesale: body.pricesale,
        content: body.content,
        spmoi: body.spmoi,
        spsale: body.spsale,
        spbanchay: body.spbanchay,
        trangthai: body.trangthai,
        nhomhuong: body.nhomhuong,
        dotuoi: body.dotuoi,
    }
    
    if (file) {
        const images = "products/"+file.originalname;
        fs.renameSync(file.path, path.resolve("src/public/images", images));
        product["images"] = images;
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
    const{file, body}= req;
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
    if(file){
        const thumbnail = "products/"+file.originalname;
        fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
        product["thumbnail"] = thumbnail;
    }
    await ProductModel.updateOne({_id: id}, {$set: product});
    res.redirect("/admin/products");
}

const del = async (req, res) => {
    const id = req.params.id;
    await ProductModel.deleteOne({_id: id});
    res.redirect("/admin/products");
}
module.exports = {
    index,
    create,
    store,
    edit,
    update,
    del,
    
};

