const express = require('express');

const routes = express.Router();

const UserPanel = require('../model/userpanel');

const UserController =require('../controller/usercontroller')



routes.post("/addpost", UserPanel.UploadPostImg, UserController.addpost);

routes.get('/viewpost',UserController.viewpost);

routes.put('/editpost/:id', UserController.editpost);

routes.delete('/Deletepost/:id', UserController.Deletepost);





module.exports = routes;