const getDatabase = require('../util/database').getDatabase;
const mongoConnect=require('../util/database').mongoConnect;
const Admin = require('../models/admin')
const User=require('../models/user')


const crypto = require("crypto");
const path = require("path")

const pendingAccount = {};
const pendingLogin = {};

exports.adminLogin=async(req,res,next)=>{

    const id = req.body.id;
    const password = req.body.password;
    var admin;
    try{
        admin = await Admin.findByIdAndPassword(id,password);
    } catch{
        res.write(JSON.stringify({
            "success": false,
            "message": "Incorrect email or password in admin"
        }, null, "\t"));
        res.end();
        return;
    }

    console.log(admin);
    if(admin!=null){
        res.write(JSON.stringify({
        "success": true,
        "user": Admin
        }, null, "\t"));
        res.end();
        return;
    } else{
        res.write(JSON.stringify({
            "success": false,
            "message": "Wrong password or id"
            }, null, "\t"));
            res.end();
            return;
    }
    


}

exports.adminChangePassword=async(req,res,next)=>{
    const id=req.body.id;
    const oldPassword=req.body.oldPassword;
    const newPassword=req.body.newPassword;
    //the address and id need to be updated later
    if(id == "admin_id"){
        if(mongoConnect){
            var dbo=_db.db("user");
            dbo.collection("users").findOne({}, function(err, result) {
                if (err) throw err;
                    if(result.password == oldPassword){
                        var myquery = { address: "User" };
                        var newvalues = { $set: {id: "admin_id", password:{newPassword}} };
                        dbo.collection("Users").updateOne(myquery, newvalues, function(err, res) {
                        if (err) throw err;
                        console.log("1 document updated");
                        _db.close();
                    });
                }
                
              });
        }
    }
}

exports.adminBlockUser=async(req,res,next)=>{
    const id=res.body.id;


}

exports.adminGetUserById=async(req,res,next)=>{

}

exports.adminGetAllUser=async(req,res,next)=>{

}