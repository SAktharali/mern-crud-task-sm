const userModel=require('../models/formModel')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const registerController = async (req, res) => {
    try {
      const existingUser = await userModel.findOne({ email: req.body.email });
      if (existingUser) {
        return res
          .status(200)
          .send({ message: "user already exist", success: false });
      }
  
      const password = req.body.password;
  
      //hash password and salt generation
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      req.body.password = hashedPassword;
  
      const newUser = new userModel(req.body);
      
      await newUser.save();
      return res
        .status(201)
        .send({ message: "Registration successful", success: true });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: `register controller error ${error.message}`,
      });
    }
  };

  const loginController = async (req, res) => {
    try {
      const user = await userModel.findOne({
        email: req.body.email,
      });
      if (!user) {
        return res
          .status(200)
          .send({ message: "user not found", success: false });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(200).send({
          message: "password didn't match",
          success: false,
        });
      }
      
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .send({ message: "Login successfully", success: true, token });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: `login controller error ${error.message}`,
        success: false,
      });
    }
  };

  const authController = async (req, res) => {
    try {
      const user = await userModel.findOne({ _id: req.body.id });
      //req.body.id from authmiddleware
      user.password = undefined;
      if (!user) {
        return res
          .status(200)
          .send({ message: "user not found", success: false });
      } else {
        res.status(200).send({ success: true, data: user });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ message: "authorization error", success: false, error });
    }
  };
  
  const profileController = async (req, res) => {
    try {
      const id=req.params.id;
      const userDetails = await userModel.findById(id);
      if (!userDetails) {
        return res.status(404).send({
          message: 'User not found',
          success: false
        });
      }
      return res.status(200).send({
        message: 'Profile fetched successfully',
        success: true,
        data: userDetails
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'Error in fetching profile details',
        success: false,
        error
      });
    }
  };
  
  const updateProfileController = async (req, res) => {
    try {
      const { password, ...otherDetails } = req.body;
      let updateData = otherDetails;
  
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateData = { ...otherDetails, password: hashedPassword };
      }
  
      const updateUserDetails = await userModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!updateUserDetails) {
        return res.status(404).send({
          message: 'User not found',
          success: false
        });
      }
      return res.status(200).send({
        message: 'Profile updated successfully',
        success: true,
        data: updateUserDetails
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'Error in updating profile details',
        success: false,
        error
      });
    }
  };

  //accountDeleteController
  const accountDeleteController=async(req,res)=>{
    try {
      const userId = req.params.id;
  
      const deletedUser = await userModel.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
     return res.status(200).send({
        success: true,
        message: "Account deleted successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error deleting account",
        error: error.message,
      });
    }
  
  }
  
module.exports={
    loginController,registerController,authController,profileController,updateProfileController,accountDeleteController
}