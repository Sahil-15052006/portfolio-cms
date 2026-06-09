const express = require('express');
const User = require('./auth.model');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const bycrpt = require('bcryptjs');

const isProduction = process.env.NODE_ENV === "production";

const loginUser = async (req, res) => {
    const { name, password } = req.body;
    // console.log("req recived")
    try{
        const stringifiedName = name.toString();
        const stringifiedPassword = password.toString();
        const user = await User.findOne({ name : stringifiedName });
        if (user){
            const passwordMatched = await bycrpt.compare(stringifiedPassword, user.password);
            if(passwordMatched){
                const token = jwt.sign(
                    { userId: user._id },
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' });

                res.cookie("token", token, {
                  httpOnly: true,
                  secure: isProduction,
                  sameSite: isProduction ? "none" : "lax",
                  maxAge: 24 * 60 * 60 * 1000,
                  domain: ".sahilsawant.tech",
                });

                res.json({
                  success: true,
                 });
            } else {
                res.status(401).json({
                     message: 'Invalid credentials'
                     });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }catch(err){
        res.status(500).json({ message: 'Server error' });
    }
};

const logoutUser = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    res.json({
      message: "User logged out successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

const isAuthenticated = (req, res) => {
  res.status(200).json({ authenticated: true });
}

module.exports = {
    loginUser,
    logoutUser,
    isAuthenticated
};

