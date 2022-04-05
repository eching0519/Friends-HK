const http = require('http');
const express = require('express');
const path = require('path');
const adminRouter = express.Router();

const Admin = require('../models/admin');


const adminController = require('../controllers/admin');
const fileEngine = require('../util/fileEngine');

adminRouter.post('/block',adminController.adminBlockUser);
adminRouter.post('/unblock',adminController.adminUnblockUser);
adminRouter.post('/login', adminController.adminLogin);

adminRouter.post('/profile/changePassword', adminController.adminChangePassword);

adminRouter.post('/delete',adminController.adminDeleteAccount);

adminRouter.post('/getuserbyid',adminController.adminGetUserById);
adminRouter.post('/userList',adminController.adminGetAllUser);



module.exports = adminRouter;