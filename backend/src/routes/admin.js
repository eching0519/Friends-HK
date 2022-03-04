const http = require('http');
const express = require('express');
const path = require('path');
const adminRouter = express.Router();

const Admin = require('../models/admin');


const adminController = require('../controllers/admin');
const fileEngine = require('../util/fileEngine');

adminRouter.post('/block',Admin.adminBlockUser);




module.exports = adminRouter;