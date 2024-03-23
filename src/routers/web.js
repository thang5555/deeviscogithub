const express = require("express")
const router = express.Router();

//admin Controller
const AdminController = require("../apps/controllers/admin");
const AuthController = require("../apps/controllers/auth");
const ProductController = require("../apps/controllers/product");

// Middleware
const AuthMiddleware = require ("../../src/apps/middlewares/auth")
const UploadMiddleware = require("../apps/middlewares/upload")
//test
const TestController = require("../apps/controllers/test");
router.get("/test", TestController.test);
router.get("/testfrom", TestController.testForm);
router.post("/testfrom", TestController.actionFrom);

//site
const SiteController =require("../apps/controllers/site")



// Router Admin
router.get("/admin/login", AuthMiddleware.checkLogin, AuthController.getLogin);
router.post("/admin/login",AuthMiddleware.checkLogin, AuthController.postLogin);
router.get("/admin/logout", AuthMiddleware.checkAdmin, AuthController.logout);
router.get("/admin/dashboard", AuthMiddleware.checkAdmin, AdminController.index);
router.get("/admin/products", AuthMiddleware.checkAdmin, ProductController.index);
router.get("/admin/products/create", AuthMiddleware.checkAdmin, ProductController.create);
router.post("/admin/products/store",
    UploadMiddleware.array("images", 12), 
    AuthMiddleware.checkAdmin,
    ProductController.store);
router.get("/admin/products/edit/:id", AuthMiddleware.checkAdmin, ProductController.edit);
router.post("/admin/products/update/:id", 
    UploadMiddleware.array("images", 12),
    AuthMiddleware.checkAdmin,
    ProductController.update);
router.get("/admin/products/delete/:id", AuthMiddleware.checkAdmin, ProductController.del);
router.get("/admin/comment", AuthMiddleware.checkAdmin, ProductController.comment);
router.get("/admin/delete/:id", AuthMiddleware.checkAdmin, ProductController.deletecomment);
router.get("/admin/order", AuthMiddleware.checkAdmin, ProductController.order);
router.get("/admin/editOrder/:id", AuthMiddleware.checkAdmin, ProductController.editOrder);



// Router Site
router.get("/", SiteController.home);
router.get("/category/:slug/:id", SiteController.category);
router.get("/product/:slug/:id", SiteController.product);
router.post("/product/:slug/:id", SiteController.comment);
router.get("/search", SiteController.search);
router.get("/cart", SiteController.cart);
router.get("/addcart/:id", SiteController.addcart);
router.post("/add-to-cart", SiteController.addToCart);
router.post("/update-cart", SiteController.updateCart);
router.post("/order", SiteController.order);
router.get("/delete-cart-:id", SiteController.deleteCart);
router.get("/success", SiteController.success);


module.exports = router;