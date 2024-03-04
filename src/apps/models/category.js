const mongoose = require("../../common/database")();

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        default: null,
    },
    image: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const CategoryModel = mongoose.model("Categories", categorySchema, "categori");
module.exports = CategoryModel; 
