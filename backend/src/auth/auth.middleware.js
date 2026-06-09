const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

   try {

      // console.log("Auth middleware called");
      // console.log("Headers:", req.headers);
      // console.log("Cookies:", req.cookies);

      const token = req.cookies.token;

      if (!token) {
        console.log("Token missing in cookies");
         return res.status(401).json({
            success: false,
            message: "Token missing"
         });
      }

      // console.log("Token received:", token);

      const decoded = jwt.verify(
         token,
         process.env.JWT_SECRET
      );

      // console.log("Decoded token:", decoded);

      req.user = decoded;

      // console.log("User attached to request:", req.user);

      next();

   } catch (error) {

      return res.status(401).json({
         success: false,
         message: "Invalid or expired token"
      });

   }
};

module.exports = authMiddleware;
