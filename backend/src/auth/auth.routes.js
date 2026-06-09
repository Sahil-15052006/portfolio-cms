const express = require('express');
const {loginUser,logoutUser,isAuthenticated}= require('./auth.controller');
const Authmiddleware = require('./auth.middleware');
const router = express.Router();

router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.get('/verify',Authmiddleware, isAuthenticated);

module.exports = router;
