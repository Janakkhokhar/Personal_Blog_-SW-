const mongoose = require("mongoose");

const multer =require('multer');

const imagepath = "/upload";

const path = require('path');

const UserSchema =mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    PostImg: {
        type: String,
    },
    Created_date: {
        type: String,
    },

})

const imgstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", imagepath));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now());
    }
});

UserSchema.statics.UploadPostImg = multer({ storage: imgstorage }).single("PostImg");
UserSchema.statics.PostModelPath = imagepath;

const userpanel = mongoose.model('user', UserSchema);
module.exports = userpanel;