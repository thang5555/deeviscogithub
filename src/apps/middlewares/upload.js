const multer = require("multer");
const upload = multer({
    dest: [
        image = `${__dirname}/../../tmp`,
    ]

});
module.exports = upload;