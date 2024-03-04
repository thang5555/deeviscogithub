const CategoryModel = require("../models/category");
const CommentModel = require("../models/comments");
const ProductModel = require("../models/product");
const ejs = require("ejs");
const path = require("path");
const transporter = require("../../common/transporter");
const { getMaxListeners } = require("events");
const VoucherkmModel = require("../models/voucherkm");
const { log } = require("console");
const home = async (req, res) => {
    const spmoi = await ProductModel.find({
        spmoi: true,
        trangthai: true,
    })
        .sort({ _id: -1 })
        .limit(16);
    const spbanchay = await ProductModel.find({
        spbanchay: true,
        trangthai: true,
    })
        .sort({ _id: -1 })
        .limit(16);
    const spsale = await ProductModel.find({
        spsale: true,
        trangthai: true,
    })
        .sort({ _id: -1 })
        .limit(16);

    res.render("site/index", { spmoi, spbanchay, spsale });
}
const category = async (req, res) => {
    const id = req.params.id;
    const category = await CategoryModel.findById(id);
    const products = await ProductModel.find({ categori_id: id });
    const total = products.length;
    // console.log(products);
    res.render("site/category", { category, products, total });
}
const product = async (req, res) => {
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    const category = await CategoryModel.findById(product.categori_id);
    const comments = await CommentModel
        .find({ product_id: id })
        .sort({ _id: -1 });
        const spsale = await ProductModel.find({
            spsale: true,
            trangthai: true,
        });
        const spmoi = await ProductModel.find({
            spmoi: true,
            trangthai: true,
        });
    res.render("site/product", { product, comments, category, spsale, spmoi});
}
const comment = async (req, res) => {
    const product_id = req.params.id;
    const { name, email, content } = req.body;
    const comment = {
        product_id,
        name,
        email,
        content,
    }
    await new CommentModel(comment).save();
    res.redirect(req.path);
}
const search = async (req, res) => {
    const keyword = req.query.keyword || "";
    const products = await ProductModel.find({
        $text: {
            $search: keyword,
        }
    });
    // console.log(products);
    res.render("site/search", { products, keyword });
}

const addToCart = async (req, res) => {
    const id = req.body.id;
    const qty = parseInt(req.body.qty);
    const items = req.session.cart;
    let isProductExists = false;

    items.map((item) => {
        if (item.id === id) {
            item.qty += qty;
            isProductExists = true;
        }
        return item;
    });
    if (!isProductExists) {
        const product = await ProductModel.findById(id);
        items.push({
            id,
            name: product.name,
            thumbnail: product.images[0].image,
            price: product.pricesale,
            qty,
        });
    }
    req.session.cart = items;
    res.redirect("/cart");
}

const cart = async (req, res) => {
    const cart = req.session.cart
    res.render("site/cart", { cart, });
}
const updateCart =  async (req, res) => {
    const products = req.body.product;
    let items = req.session.cart;
    const newItems = items.map((item) => {
        item.qty = parseInt(products[item.id]["qty"]);
        return item;
    });
    req.session.cart = newItems;

    res.redirect("/cart", );
}
const order = async (req, res) => {
    const items = req.session.cart;
    const body = req.body;
    const html = await ejs.renderFile(
        path.join(req.app.get("views"), "site/email-order.ejs"),
        {
            name: body.name,
            phone: body.phone,
            mail: body.mail,
            add: body.add,
            items
        });
    await transporter.sendMail({
        from: '"DEEVISCO™ SHOP" <kinhdoanh.deevisco@gmail.com>', // sender address
        to: [body.mail, "bsthang9x@gmail.com" ],// list of receivers
        subject: "Xác nhận đơn hàng từ DEEVISCO™", // Subject line
        html, // html body
    });
    req.session.cart = [];
    res.redirect("/success");
}

const deleteCart = (req, res) => {
    const { id } = req.params;
    let items = req.session.cart;
    const newItems = items.filter((item) => item.id != id);
    req.session.cart = newItems;
    res.redirect("/cart");
}

const success = (req, res) => {
    res.render("site/success");
}

module.exports = {
    home,
    category,
    product,
    comment,
    search,
    cart,
    updateCart,
    order,
    deleteCart,
    addToCart,
    success,
}


