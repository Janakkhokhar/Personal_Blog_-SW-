const express =require('express');

const port = 9004;

const app = express();

const path =require('path')

const db = require('./cofig/mongoose');

app.use(express.urlencoded());

app.use("/upload",express.static(path.join(__dirname,"upload")))

app.use("/",require("./route/user"))

app.listen(port,function(err){
    (err) ? console.log("something worng"):console.log("success running code",port);

})