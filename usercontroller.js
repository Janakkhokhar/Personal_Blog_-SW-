const UserPanel = require('../model/userpanel');
const fs = require('fs');
const path = require('path')

module.exports.addpost = async (req, res) => {
    // console.log(req.body);
    try {
        const ImagePath = "";
        if (req.file) {
            ImagePath = UserPanel.PostModelPath + "/" + req.file.filename;
        } else {
            return res.status(400).json({ mes: "Image not found", status: 0 });
        }
        if (req.body) {
            req.body.PostImg = ImagePath;
            req.body.Created_date = new Date().toLocaleDateString();
            const data = await UserPanel.create(req.body);
            if (data) {
                return res.status(200).json({ mes: "data insert succesfully", data: data, status: 1 });
            }
            else {
                return res.status(400).json({ mes: "data null", status: 0 });

            }

        }
        else {
            return res.status(200).json({ mes: "data not found", status: 0 });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ mes: "something worng", status: 0 });
    }
}

module.exports.viewpost = async (req, res) => {
    try {
        const viewData = await UserPanel.find({});
        if (viewData != "") {
            return res.status(200).json({
                msg: "Here is all post   data", viewData: viewData, status: 1
            });
        } else {
            return res.status(200).json({ msg: "No post found", status: 0 });
        }
    } catch (error) {
        console.log(error);
        return req.status(400).json({ mes: "something worng", status: 0 })
    }
}


module.exports.Deletepost = async (req, res) => {
    try {
        const olddata = await UserPanel.findById(req.params.id);
        if (olddata) {
            const oldImage = olddata.PostImg;
            if (oldImage) {
                const fullpath = path.join(__dirname, ".." + olddata.PostImg);
                const dImage = await fs.unlinkSync(fullpath);
                const deleteRecord = await UserPanel.findByIdAndDelete(req.params.id);
                if (deleteRecord) {
                    return res.status(200).json({ mes: "Record and image delets successfully", status: 0 });
                } else {
                    return res.status(200).json({ mes: "Record delete successfully", status: 0 });
                }
            }
            else {
                let deletedata = await UserPanel.findByIdAndDelete(req.params.id, req.body)
                if (deletedata) {
                    return res.status(200).json({ mes: "Delete record sucessfully", deletedata: deletedata, status: 1 });
                }
                else {
                    return res.status(200).json({ mes: "invliad Data", status: 0 });

                }
            }
        }
    }
    catch (error) {
        console.log(error);
        return req.status(400).json({ mes: "something worng", status: 0 })
    }



    module.exports.editpost = async (req, res) => {
        try {
            let oldData = await adminpanel.findById(req.body.oldId);
            if (req.file) {
                if (oldData.AdminImg) {
                    let fullPath = path.join(__dirname, ".." + oldData.AdminImg);
                    await fs.unlinkSync(fullPath);
                }
                let imagePath = "";
                imagePath = adminpanel.AdminModelPath + "/" + req.file.filename;
                req.body.AdminImg = imagePath;
                res.locals.user.AdminImg = imagePath;
            } else {
                req.body.AdminImg = oldData.AdminImg;
            }
            let editdata = await UserPanel.findByIdAndUpdate(req.params.id, req.body)
            if (editdata) {
                return res.status(200).json({ mes: "Edit record sucessfully", editdata: editdata, status: 1 });
            }
            else {
                return res.status(200).json({ mes: "invliad Data", status: 0 });

            }
        } catch (error) {
            console.log(error);
            return req.status(400).json({ mes: "something worng", status: 0 })
        }
    }