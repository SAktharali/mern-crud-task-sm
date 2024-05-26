const jwt=require('jsonwebtoken');
const { authController } = require('../controllers/userControllers');

module.exports = async (req, res, next) => {
    try {
      const token = req.headers["authorization"].split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
        if (error) {
          return res.status(401).send({
            message: "authorization failed",
            success: false,
          });
        } else {
          req.body.id = decoded.id;
          // req.body.id from userctrl authController
          next();
        }
      });
    } catch (error) {
      return res.status(401).send({
        message: "authorization failed", 
        success: false,
      });
    }
  };
  