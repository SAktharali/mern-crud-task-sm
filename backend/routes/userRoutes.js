const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
    loginController,
    registerController,
    authController,profileController,updateProfileController,
    accountDeleteController
} = require("../controllers/userControllers");

// router object
const router = express.Router();

//routes

//Login post
router.post("/login", loginController);

//register post
router.post("/register", registerController);

//auth post
router.post("/getUsers", authMiddleware, authController);

//getProfile
router.get("/get-profile/:id", authMiddleware, profileController);

//update profile
router.put("/update-profile/:id", authMiddleware,updateProfileController);

//account Delete
router.delete("/delete-account/:id",authMiddleware,accountDeleteController)

module.exports = router;
